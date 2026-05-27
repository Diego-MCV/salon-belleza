# 🚀 Despliegue en Azure — Docker + Kubernetes (AKS)

Guía completa para llevar el proyecto **Salón Belleza** a producción en Azure
usando Docker, Azure Container Registry (ACR) y Azure Kubernetes Service (AKS).

---

## 📋 Requisitos previos

| Herramienta | Versión mínima | Instalación |
|---|---|---|
| Azure CLI | 2.60+ | `winget install Microsoft.AzureCLI` |
| Docker Desktop | 25+ | https://www.docker.com/products/docker-desktop |
| kubectl | 1.30+ | `az aks install-cli` |
| Cuenta Azure | — | https://portal.azure.com |

---

## 🛠️ Paso 1 — Preparar recursos en Azure

```bash
# 1. Iniciar sesión
az login

# 2. Crear Resource Group
az group create \
  --name rg-salon-belleza \
  --location eastus

# 3. Crear Azure Container Registry (ACR)
#    El nombre debe ser único globalmente, solo letras y números
az acr create \
  --resource-group rg-salon-belleza \
  --name tuacr \
  --sku Basic \
  --admin-enabled true

# 4. Crear clúster AKS (2 nodos Standard_B2s ~$70/mes)
az aks create \
  --resource-group rg-salon-belleza \
  --name aks-salon-belleza \
  --node-count 2 \
  --node-vm-size Standard_B2s \
  --attach-acr tuacr \
  --enable-app-routing \
  --generate-ssh-keys

# 5. Obtener credenciales de kubectl
az aks get-credentials \
  --resource-group rg-salon-belleza \
  --name aks-salon-belleza

# Verificar conexión
kubectl get nodes
```

---

## 🐳 Paso 2 — Build y Push de la imagen Docker

```bash
# Login en ACR
az acr login --name tuacr

# Build local
docker build -t tuacr.azurecr.io/salon-belleza:latest .

# Verificar que funciona localmente
docker run -p 8080:80 tuacr.azurecr.io/salon-belleza:latest
# Abre http://localhost:8080

# Push al registro
docker push tuacr.azurecr.io/salon-belleza:latest
```

---

## ☸️ Paso 3 — Ajustar los manifiestos de Kubernetes

Antes de aplicar, edita **`k8s/deployment.yaml`** y reemplaza:
```yaml
image: <TU_ACR>.azurecr.io/salon-belleza:latest
# ↓ por:
image: tuacr.azurecr.io/salon-belleza:latest
```

Si tienes un dominio, edita **`k8s/ingress.yaml`**:
```yaml
host: salon-belleza.example.com
# ↓ por tu dominio real, o borra la línea host para usar IP pública
```

---

## ☸️ Paso 4 — Desplegar en AKS

```bash
# Aplicar todos los manifiestos en orden
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml

# Verificar que los pods están corriendo
kubectl get pods -n salon-belleza

# Ver el Ingress y obtener la IP pública (puede tardar 2-3 min)
kubectl get ingress -n salon-belleza

# Logs en tiempo real
kubectl logs -l app=salon-belleza -n salon-belleza -f
```

---

## 🤖 Paso 5 — CI/CD automático con GitHub Actions

El pipeline en `.github/workflows/azure-deploy.yml` hace **build + deploy automático** cada vez que haces push a `main`.

### Configurar el secreto `AZURE_CREDENTIALS`

```bash
# Crear Service Principal con permisos sobre el Resource Group
az ad sp create-for-rbac \
  --name sp-salon-belleza \
  --role contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/rg-salon-belleza \
  --sdk-auth
```

Copia el JSON que devuelve y agrégalo en:
**GitHub → Settings → Secrets and variables → Actions → New repository secret**
- Nombre: `AZURE_CREDENTIALS`
- Valor: el JSON completo

### Actualizar variables en el workflow

Edita `.github/workflows/azure-deploy.yml`:
```yaml
env:
  ACR_NAME: tuacr                       # tu nombre real de ACR
  AKS_RESOURCE_GROUP: rg-salon-belleza  # tu resource group
  AKS_CLUSTER_NAME: aks-salon-belleza   # tu cluster
```

Con esto, cada `git push origin main` despliega automáticamente en AKS. ✅

---

## 🏗️ Arquitectura del despliegue

```
GitHub (push a main)
        │
        ▼
GitHub Actions CI/CD
   ├── docker build
   ├── docker push → Azure Container Registry (ACR)
   └── kubectl apply → Azure Kubernetes Service (AKS)
                              │
                    ┌─────────┴─────────┐
                    │   Namespace:      │
                    │  salon-belleza    │
                    │                  │
                    │  Pod 1 (nginx)   │
                    │  Pod 2 (nginx)   │
                    │       │          │
                    │   Service        │
                    │  (ClusterIP)     │
                    │       │          │
                    │   Ingress        │
                    └───────┼──────────┘
                            │
                      IP Pública Azure
                            │
                        Usuarios 🌐
```

---

## 📁 Estructura de archivos agregados

```
proyecto/
├── Dockerfile                          # Build multi-stage (Node → Nginx)
├── .dockerignore                       # Excluye node_modules, dist, etc.
├── nginx/
│   └── nginx.conf                      # SPA fallback + /health + gzip
├── k8s/
│   ├── namespace.yaml                  # Namespace "salon-belleza"
│   ├── deployment.yaml                 # 2 réplicas, rolling update
│   ├── service.yaml                    # ClusterIP interno
│   ├── ingress.yaml                    # IP pública con AGIC
│   └── hpa.yaml                        # Autoscaling 2–5 pods
└── .github/
    └── workflows/
        └── azure-deploy.yml            # Pipeline CI/CD completo
```

---

## 💡 Comandos útiles post-despliegue

```bash
# Ver estado general
kubectl get all -n salon-belleza

# Escalar manualmente (ej: para un evento especial)
kubectl scale deployment salon-belleza --replicas=4 -n salon-belleza

# Actualizar imagen sin CI/CD
docker build -t tuacr.azurecr.io/salon-belleza:v2 .
docker push tuacr.azurecr.io/salon-belleza:v2
kubectl set image deployment/salon-belleza \
  salon-belleza=tuacr.azurecr.io/salon-belleza:v2 -n salon-belleza

# Rollback si algo sale mal
kubectl rollout undo deployment/salon-belleza -n salon-belleza

# Eliminar todo (para no gastar créditos)
az group delete --name rg-salon-belleza --yes
```

---

## 💰 Estimación de costos (eastus, 2 nodos Standard_B2s)

| Recurso | Costo aprox/mes |
|---|---|
| AKS (2× Standard_B2s) | ~$70 USD |
| ACR (Basic) | ~$5 USD |
| Public IP / Ingress | ~$3 USD |
| **Total** | **~$78 USD/mes** |

> 💡 Para demos o aprendizaje usa `--node-count 1` y apaga el clúster con
> `az aks stop --name aks-salon-belleza --resource-group rg-salon-belleza` cuando no lo uses.

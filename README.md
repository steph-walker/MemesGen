# MemesGen

## Install k8ssandra per [k8ssandra.io](https://k8ssandra.io/)

```
helm install -f k8ssandra.yaml k8ssandra k8ssandra/k8ssandra
watch kubectl get pods
```

## User and pass needed for app .env
```
kubectl get secret k8ssandra-superuser -o jsonpath="{.data.username}" | base64 --decode ; echo
kubectl get secret k8ssandra-superuser -o jsonpath="{.data.password}" | base64 --decode ; echo
```

## Port forwarding for local testing
kubectl port-forward svc/k8ssandra-dc1-stargate-service 8080 8081 8082 9042

## Use cqlsh to load memegen.cql statements

```
./bin/cqlsh localhost 9042 -u [user above] -p [pass above]`
```
Get [cqlsh](https://downloads.datastax.com/#cqlsh).

## Role out app 

```
kubectl apply -f deployment.k8s.yaml
kubectl port-forward deployments/memegen-v2  1337:80
kubectl exec -it deployments/memegen-v2 /bin/bash
```
Docker [image](https://hub.docker.com/repository/docker/dsstevenmatison/memegen2).
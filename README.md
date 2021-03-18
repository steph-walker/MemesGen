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

## Create the own dockerhub image

1. Git clone [this repo]
2. Edit /api/common.php (enter username/password from above, enter k8s IP for stargate pod)
3. Next build and push image
```
docker build . -t dsstevenmatison/memegen2
docker push dsstevenmatison/memegen2
```
4. Edit deployment.k8s.yaml accordingly
```
kubectl apply -f deployment.k8s.yaml
```

## Cluster should looke like
```
NAME                                                READY   STATUS      RESTARTS   AGE
k8ssandra-reaper-operator-79fd5b4655-qvgls          1/1     Running     0          152m
k8ssandra-cass-operator-7d5df6d49-pc5cj             1/1     Running     0          152m
k8ssandra-grafana-5c6d5b8f5f-w67fw                  2/2     Running     0          152m
k8ssandra-kube-prometheus-operator-85695ffb-6fpfl   1/1     Running     0          152m
prometheus-k8ssandra-kube-prometheus-prometheus-0   2/2     Running     1          151m
k8ssandra-dc1-default-sts-0                         2/2     Running     0          151m
k8ssandra-reaper-schema-cqgm6                       0/1     Completed   0          148m
k8ssandra-reaper-7bb77d575c-n9sv9                   1/1     Running     0          148m
k8ssandra-dc1-stargate-646d6bcd68-d46rp             1/1     Running     0          152m
memegen-v2-6fd6b955f6-v66xs                         1/1     Running     0          3m45s
```
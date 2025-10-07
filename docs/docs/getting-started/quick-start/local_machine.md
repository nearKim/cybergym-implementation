---
sidebar_position: 1
---

# Starting on a Local Machine

Learn how to use CyberGym on your local machine, please finish the [installation](../installation.md) part before proceeding.

## Evaluation of CyberGym
### Start Docker
1. Open up the Docker Desktop application and ensure that it is running.
2. We need two seperate terminals for the server and the client. Open up two terminal windows.
3. Activate your MiniCondas.
4. On both terminals, please use the following command to use the proper docker context:
```shell
docker context use desktop-linux
docker start
```
4. If the previous step fails, please ensure that you unset the global path of `DOCKER_HOST` and run the previous step again.

To unset on bash:
```bash
unset DOCKER_HOST
```
To unset on fish:
```bash
set -e DOCKER_HOST
```
5. Verify that the docker context is set to `desktop-linux`:
```bash
docker context ls
```
You should see an asterisk next to `desktop-linux`.

### Server Side
1. In the first terminal for the server, navigate to the root directory of the cybergym repository. Run the following command to build and start the server:
```bash
python start_server.py
```
2. Verify that the server is running on `http://0.0.0.0:8666`
### Client Side
1. In the second terminal for the client, navigate to the root directory of the cybergym repository. Run the following command to build and start the client:
```bash
python start_client.py
```
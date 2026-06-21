---
description: How to cleanly restart the finance-council backend server on Port 8000
---

// turbo-all

## Restart Finance Council Backend Server

Use this workflow any time you need to start or restart the uvicorn backend. NEVER start uvicorn without running this first.

1. Kill any existing process holding Port 8000:
```
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force
```

2. Wait 1 second, then start the server fresh:
```
python -m uvicorn api:app --host 0.0.0.0 --port 8000
```

3. Verify the server is accepting connections before proceeding:
```
curl.exe -s http://localhost:8000/ 
```
Expected output: `{"status":"Credit Card Council Agent API is running!"}`

Only proceed to make test API calls AFTER Step 3 confirms the server is running.

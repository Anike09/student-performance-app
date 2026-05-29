# Quick E2E Test

Register → Login → Access Dashboard

1. Start backend and frontend:

```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm start
```

2. Register via UI at `http://localhost:3000/register` or use curl:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","username":"you","password":"Password123"}'
```

3. Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"Password123"}'
```

4. Verify protected route:

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:5000/api/auth/me
```

5. Frontend should store token in `localStorage` under `student-dashboard-token`.

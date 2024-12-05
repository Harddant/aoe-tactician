# t3 aoe-tactician app 

## _Setup Guide_

- Pull repository
- Copy .env.example into .env
- Change DATABASE_URL to match Docker (usually called `db` by default)
- - something like `DATABASE_URL="mysql://root:root@db:3306/aoe-tactician-main"`
- Run `docker compose -f docker-compose.dev.yml build --no-cache`
- Run `npm i`
- Inside the App Docker Container, run `npx prisma generate`
- Inside the App Docker Container, run `npx prisma db push`


# Cafetaria Backend - Vercel Deployment

## Deployment Steps

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
vercel --prod
```

## Environment Variables

Set these environment variables in Vercel dashboard:

### Required Variables:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `JWT_SECRET` - JWT secret key (if using JWT)
- `NODE_ENV` - Set to "production"

### Optional Variables:

- `BASE_IMAGE_URL` - Base URL for images (your Vercel app URL)

## Project Structure

```
backend/
├── api/
│   └── index.ts          # Vercel entry point
├── src/
│   ├── server.ts         # Express app
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── routes/
│   └── types/
├── vercel.json           # Vercel configuration
├── .vercelignore         # Files to ignore during deployment
└── package.json
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products

- `GET /api/product/get` - Get all products
- `POST /api/product/post` - Create new product (mitra only)
- `PUT /api/product/update/:id` - Update product (mitra only)
- `DELETE /api/product/delete/:id` - Delete product (mitra/admin)
- `PUT /api/product/approve` - Approve product (admin only)
- `PUT /api/product/availability/:id` - Toggle product availability (mitra)

### Documentation

- `GET /api-docs` - Swagger API documentation

## Notes for Vercel Deployment

1. **File Uploads**: Vercel has limitations with file uploads. Consider using Supabase Storage or Cloudinary for image uploads.

2. **Environment Variables**: Set all required environment variables in Vercel dashboard before deployment.

3. **CORS**: Update CORS configuration in production to allow your frontend domain.

4. **Database**: Make sure Supabase is properly configured and accessible from Vercel.

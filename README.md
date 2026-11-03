# Kindred API

Backend API for **Kindred — Together for Change**, a community-driven volunteering platform.

This API manages community events, featured events, volunteer participation, and event management using Express.js and MongoDB.

## 🔗 Base URL

```text
https://kindred-server.vercel.app
```

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- CORS
- Vercel

## ✨ Features

- Retrieve all community events
- Retrieve featured upcoming events
- Retrieve events by category
- Retrieve event details by ID
- Retrieve events by email
- Join and leave events
- Check volunteer participation
- Create, update, and delete events
- Protected API routes using JWT authentication

## 📡 API Endpoints

### Events

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get event details |
| GET | `/api/events/category/:categoryId` | Get events by category |
| GET | `/api/events/email/:email` | Get events by email |
| GET | `/api/featured` | Get featured upcoming events |
| POST | `/api/events` | Create a new event |
| PATCH | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event |

### Joined Events

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/joined` | Get joined events |
| GET | `/api/joined/:id` | Check volunteer participation |
| POST | `/api/joined` | Join an event |
| DELETE | `/api/joined/:id` | Leave an event |

## 🔐 Authentication

Protected endpoints require a valid JWT token.

Add the following header to your request:

```http
Authorization: Bearer YOUR_TOKEN
```

The API verifies tokens using the authentication server's JWKS endpoint.

### Protected Routes

- `GET /api/events/email/:email`
- `GET /api/joined`
- `GET /api/joined/:id`
- `POST /api/joined`
- `DELETE /api/joined/:id`
- `POST /api/events`
- `PATCH /api/events/:id`
- `DELETE /api/events/:id`

## 🚀 Example Requests

### Get All Events

```http
GET https://kindred-server.vercel.app/api/events
```

### Get Featured Events

```http
GET https://kindred-server.vercel.app/api/featured
```

### Get Events by Category

```http
GET https://kindred-server.vercel.app/api/events/category/blood-donation
```

### Get Event Details

```http
GET https://kindred-server.vercel.app/api/events/YOUR_EVENT_ID
```

### Join an Event

```http
POST https://kindred-server.vercel.app/api/joined
```

Request Header:

```http
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

Request Body:

```json
{
  "eventId": "YOUR_EVENT_ID",
  "email": "your-email@example.com",
  "joinedAt": "2026-11-03T10:00:00.000Z"
}
```

### Check Joined Event

```http
GET https://kindred-server.vercel.app/api/joined/YOUR_EVENT_ID
```

Requires authentication.

### Leave an Event

```http
DELETE https://kindred-server.vercel.app/api/joined/YOUR_EVENT_ID
```

Requires authentication.

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
NEXT_PUBLIC_CLIENT_URL=your_frontend_url
```

**Note:** Never commit your `.env` file or expose your MongoDB credentials.

## 💻 Local Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd kindred-server
```

Install dependencies:

```bash
npm install
```

Create your `.env` file and configure the required environment variables.

Start the server:

```bash
node index.js
```

The API will run locally at:

```text
http://localhost:5000
```

## 👨‍💻 Author

**Sheikh Md Sazzad Hossain**

- GitHub: [@sm-sazzad](https://github.com/sm-sazzad)

---

Built for the Kindred community volunteering platform.

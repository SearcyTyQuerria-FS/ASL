# Space Tracker App

This is the space tracker app for my Advanced Server-side Languages class (WDV442).

## Setup

Install dependencies:

```bash
npm install
```

Start the MySQL and Node containers:

```bash
docker compose up
```

Run the database migration and sample data seed from the Node container or a shell that can reach MySQL:

```bash
npm run db:migrate
npm run db:seed
```

## Space Object API

The app exposes a RESTful `SpaceObject` resource at `/space-objects`.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/space-objects` | List all space objects |
| `GET` | `/space-objects?type=planet` | List space objects by type |
| `GET` | `/space-objects/:id` | Show one space object |
| `POST` | `/space-objects` | Create a space object |
| `PUT` | `/space-objects/:id` | Update a space object |
| `DELETE` | `/space-objects/:id` | Delete a space object |

Example request body:

```json
{
  "name": "Mars",
  "type": "planet",
  "description": "The fourth planet from the Sun.",
  "distanceFromEarth": 225000000,
  "diameter": 6779,
  "discoveredAt": null
}
```


# Starting 

- `npm install` to install all required dependencies
- Create MongoDb Cluster and Get Connection MongoDb URI
- Set environment variables in `config.env` under `./config/env`
  * Set `MONGO_URI = <YOUR_MONGO_URI>`
  * Set `JWT_SECRET_KEY = <YOUR_SECRET_KEY>`
  * Set `SMTP_EMAIL=<YOUR_GMAIL_EMAIL>`
  * Set `SMTP_PASS=<YOUR_GMAIL_PASSWORD>`

## Dependencies

- [expressjs](https://github.com/expressjs/express) 
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) 
- [mongoose](https://github.com/Automattic/mongoose)
- [slugify](https://github.com/simov/slugify) 
- [bcryptjs](https://github.com/dodo/node-slug)
- [dotenv](https://github.com/motdotla/dotenv) 
- [nodemailer](https://github.com/nodemailer/nodemailer)

## Error Handling

In `middlewares/errors/errorHandler.js`





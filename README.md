# Team presentation 

**Team name:** Early Birds  

**Team members:**  
- Kim Phung Nguyen Hoang  
- Vladyslav Zavdskyi  
- Nadja Brandenstein  
- Jesper Svoldgaard  

---

# About this project 

## Dead Pigeons 🐦
The game we are creating for Jerne-IF is called Dead Pigeons 🐦.  
It is a game they play physically at the moment but want in a web application for the younger people in their organization so they also can play but don't have to show up each weekend physically to play. 

The game is played with a board with **16 fields**, and you have to choose between **5–8 fields** on your given board.  
At the end of the week on game day, **3 winning numbers** are drawn and if you have these numbers among your chosen fields, you are one of the winners.

For all boards played this week, the money is put in a **prize-pool** where **70%** is for the winners to split and **30%** goes to the organization.

We are tasked with creating the web application for Jerne-IF and make it work and function so they can put it in use from the get-go after we have handed it in. 

---

# Program must be written in 
- C# for backend and API  
- React + TypeScript for frontend  

---

# Program must contain 
- Login with security  
- Game board  
- Profile Settings user  
- Profile Settings Admin – admin can make a user active or inactive because only active players can buy boards  

---

# We have made so it contains 
- Login with security  
- Frontpage for both player and admin  
- Playing board for player  
- Active board for player – must be activated by the admin before it is valid  
- History of played games – old games you haven't played or have played and if you have won or lost  
- Active board for admin – check if user has paid for the board and activate it so user can see they have an active board  
- Profile Settings user  
- Profile Settings Admin – admin can make a user active or inactive because only active players can buy boards  
- Winner numbers – admin can put in the 3 numbers drawn  
- Winning boards – admin can see who has won and pay them their share of the prize-pool  

---

# Current state of the project 

The current state of the project is that we have a **100% functional product**, and it all works with no errors present.  
We have tested it through unit tests at the backend and normal use to see if something breaks when using the product.

---

# Security Policies

This project implements multiple security mechanisms to protect user data and ensure secure authentication and authorization.

## 1. JWT (JSON Web Token) Authentication
- The application uses JWT for stateless authentication.  
- After logging in, the user receives a signed token that must be included with each request.  
- Tokens are signed using **HMAC-SHA512**.  
- The signing secret is stored as **JwtKey** (should be stored securely in production).  
- The token includes an expiration time and is validated on every request.  
- Validation checks the token’s issuer, audience, expiration, and signature.

## 2. Password Hashing (Argon2id + Salt)
- Passwords are never stored in plain text.  
- We use **NSecArgon2IdPasswordHasher**, which applies the Argon2id algorithm—one of the strongest password hashing algorithms.  

How passwords are handled:
- A unique cryptographic salt is generated for each password.  
- Passwords are hashed using Argon2id, which is memory-hard and resistant to brute-force and GPU attacks.  
- Only the final hash (not the password or salt) is stored in the database.

## 3. Token Signing with HMAC-SHA512
JWT tokens are signed using the following configuration:

public const string SignatureAlgorithm = SecurityAlgorithms.HmacSha512;

This ensures:
- Strong token integrity  
- Protection against tampering  
- Prevention of token forgery  

## 4. Secure Configuration Storage
Sensitive values such as:

public const string JwtKey = "JwtKey";

Are not hard-coded in production.  
They must be stored in secure locations such as:
- Environment variables  
- User secrets  
- Secret managers or vaults  

## 5. Additional Security Measures
- HTTPS is required to encrypt network traffic  
- Token expiration is enforced to limit the lifetime of compromised tokens  
- Role/claim-based authorization ensures users can only access permitted resources  

---

# Formating and linting 

## Formatting we have used:
- `.prettierrc` – make sure we all do the same with small formatting things like using quotes and semicolons  
- `.secretlintrc.json` – ensures we don't commit secrets  
- Husky with (commit-msg, pre-commit & pre-push) – ensures we all use Git the same way when pushing to GitHub  

## Linting:
- ESLint (included with React)  
- Custom rules for ESLint (**No-State-in-View**) to ensure we remember to use hooks and don't use states directly in our page views  





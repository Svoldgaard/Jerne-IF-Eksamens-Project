🐦 Dead Pigeons – Jerne IF Web Game

A school exam project by Team Early Birds

👥 Team Presentation

Team Name: Early Birds

Team Members:

Kim Phung Nguyen Hoang

Vladyslav Zavdskyi

Nadja Brandenstein

Jesper Svoldgaard

📌 About the Project

Dead Pigeons 🐦 is a digital version of a physical game currently played in Jerne IF.
The goal of the project is to create a web application so younger members of the organization can participate without having to show up physically every weekend.

🎮 How the Game Works

The game board contains 16 fields.

Each player selects 5–8 fields on their board.

At the end of the week, 3 winning numbers are drawn.

If the player has these numbers among their selected fields, they are considered winners.

💰 Prize Pool

All money spent on boards for that week goes into a prize pool.

70% is shared among the winners.

30% goes to Jerne IF.

🎯 Project Goal

We were tasked with creating a fully functional web application that Jerne IF can use immediately after delivery.

🧑‍💻 Technologies Used
Backend

C#

.NET API

Frontend

React

TypeScript

📦 Mandatory Features

The program must include:

Login with security

Game board

Profile settings (user)

Profile settings (admin)

Admin can activate/deactivate users

Only active users can buy boards

✅ Features Implemented

Player

Secure login

Player dashboard / front page

Game board

Active board (must be activated by admin)

History of played games

Shows wins/losses

Profile settings

Admin

Admin dashboard / front page

Activate/deactivate players

Activate purchased boards

Enter weekly winning numbers

View winning boards + payout overview

📊 Current State of the Project

The project is 100% functional.

No known errors.

Thoroughly tested using:

Backend unit tests

Manual functional testing

🔒 Security Policies

This project implements several security mechanisms to ensure protection of user data.

1. JWT (JSON Web Token) Authentication

Stateless authentication

Token issued upon login

Signed using HMAC-SHA512

Signing key stored securely as JwtKey

Token includes:

Expiration time

Issuer + audience checks

Signature validation

2. Password Hashing (Argon2id + Salt)

Passwords never stored in plain text

Using NSecArgon2IdPasswordHasher

Each password is hashed with:

A unique cryptographic salt

The Argon2id algorithm (memory-hard, GPU-resistant)

Only the final hash is stored in the database

3. Token Signing with HMAC-SHA512

Configuration:

public const string SignatureAlgorithm = SecurityAlgorithms.HmacSha512;


This ensures:

Strong token integrity

Protection against tampering

Prevention of token forgery

4. Secure Configuration Storage

Sensitive values like:

public const string JwtKey = "JwtKey";


must not be hard-coded in production.

They should be stored in:

Environment variables

User secrets

Secret managers or vaults

5. Additional Security Measures

HTTPS enforcement

Token expiration

Role- and claim-based authorization

🧹 Formatting and Linting
Formatting

We use:

.prettierrc

Ensures consistent formatting (quotes, semicolons, etc.)

.secretlintrc.json

Prevents committing secrets

Husky (commit-msg, pre-commit, pre-push)

Ensures consistent Git workflows

Linting

ESLint (default for React)

Custom rule: No-State-in-View

Ensures we use hooks properly instead of placing state directly in the view

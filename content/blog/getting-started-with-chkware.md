---
title: Getting Started with CHKware for API Testing
date: 2025-06-15
authors: [johnDoe]
tags: [Getting Started, API Testing, Tutorial]
description: Learn how to set up CHKware and create your first API test in minutes. This guide covers installation, configuration, and basic usage.
image: /images/blog/api-testing.jpg
---

# Getting Started with CHKware for API Testing

CHKware is a powerful tool for API testing that allows you to create, run, and manage API tests with ease. In this guide, we'll walk through the process of setting up CHKware and creating your first API test.

## Installation

To install CHKware, you can use npm:

```bash
npm install -g chkware
```

Or using yarn:

```bash
yarn global add chkware
```

## Configuration

After installation, you'll need to create a configuration file. Create a file named `chkware.config.yaml` in your project root:

```yaml
version: 1.0
environment:
  base_url: https://api.example.com
  headers:
    Content-Type: application/json
```

## Creating Your First Test

Now, let's create a simple test. Create a file named `first-test.chk`:

```yaml
---
version: default:http:0.7.2

request:
  url: "/users"
  method: GET

validate:
  status: 200
  json:
    type: array
    minItems: 1
```

## Running the Test

To run your test, use the following command:

```bash
chk run first-test.chk
```

You should see output indicating whether the test passed or failed.

## Next Steps

Now that you've created your first test, you can explore more advanced features:

- Authentication
- Environment variables
- Test suites
- CI/CD integration

Check out our documentation for more detailed information on these topics.

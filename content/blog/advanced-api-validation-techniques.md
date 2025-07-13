---
title: Advanced API Validation Techniques
date: 2025-06-22
authors: [janeDoe]
tags: [API Testing, Validation, Advanced]
description: Take your API testing to the next level with advanced validation techniques. Learn how to validate complex JSON structures, use schemas, and more.
image: /images/blog/validation.jpg
---

# Advanced API Validation Techniques

When testing APIs, simple status code validation is often not enough. In this article, we'll explore advanced validation techniques that will help you create more robust and reliable API tests.

## JSON Schema Validation

One of the most powerful validation techniques is using JSON Schema. CHKware supports JSON Schema validation out of the box:

```yaml
validate:
  json:
    $schema: http://json-schema.org/draft-07/schema#
    type: object
    required:
      - id
      - name
      - email
    properties:
      id:
        type: integer
      name:
        type: string
      email:
        type: string
        format: email
```

## Response Time Validation

You can also validate the response time to ensure your API is performing well:

```yaml
validate:
  responseTime: 
    lessThan: 500  # milliseconds
```

## Custom JavaScript Validation

For complex validation logic, you can use custom JavaScript:

```yaml
validate:
  custom: |
    const response = JSON.parse(context.response.body);
    if (response.data.length === 0) {
      throw new Error("Expected non-empty data array");
    }
    if (!response.pagination.hasNextPage && response.pagination.page < 10) {
      throw new Error("Pagination logic error");
    }
```

## Conditional Validation

Sometimes you need to validate different things based on the response:

```yaml
validate:
  status: 200
  conditions:
    - if: "response.body.status === 'active'"
      then:
        json:
          properties:
            activeSince:
              type: string
              format: date-time
    - if: "response.body.status === 'pending'"
      then:
        json:
          properties:
            pendingReason:
              type: string
```

## Conclusion

By using these advanced validation techniques, you can create more comprehensive API tests that catch subtle issues before they reach production. Remember that the goal of API testing is not just to verify that the API works, but to ensure it works correctly under all conditions.

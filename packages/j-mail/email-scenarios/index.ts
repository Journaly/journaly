import updateEmail from '../src/emails/updateEmail' 

const scenarios = {
  "update:other-only": {
    "handler": updateEmail,
    "data": {
      "user": {
        "id": 5,
        "name": null,
        "email": "xorcon@zlago.net",
        "handle": "Xorcon",
        "userRole": "FREE_USER",
        "bio": null,
        "city": null,
        "country": null,
        "createdAt": "2021-01-01T16:53:24.968Z",
        "updatedAt": "2021-01-01T16:53:24.968Z",
        "profileImage": null
      },
      "own": [],
      "other": [
        {
          "type": "POST_COMMENT",
          "notificationDate": "2021-01-02T22:21:27.236Z",
          "postComment": {
            "id": 6,
            "createdAt": "2021-01-02T22:21:27.236Z",
            "updatedAt": "2021-01-02T22:21:27.236Z",
            "body": "zup",
            "authorId": 6,
            "postId": 17,
            "post": {
              "id": 17,
              "title": "Zoop doop and boop",
              "body": "<p>this is a sentence which contains multiple words</p>",
              "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
              "excerpt": "this is a sentence which contains multipl",
              "status": "PUBLISHED",
              "createdAt": "2021-01-01T16:52:46.893Z",
              "updatedAt": "2021-01-01T16:52:46.894Z",
              "publishedAt": "2021-01-01T16:52:46.890Z",
              "authorId": 1,
              "readTime": 0,
              "languageId": 1,
              "publishedLanguageLevel": "NATIVE",
              "longitude": null,
              "latitude": null
            }
          },
          "post": {
            "id": 17,
            "title": "Zoop doop and boop",
            "body": "<p>this is a sentence which contains multiple words</p>",
            "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
            "excerpt": "this is a sentence which contains multipl",
            "status": "PUBLISHED",
            "createdAt": "2021-01-01T16:52:46.893Z",
            "updatedAt": "2021-01-01T16:52:46.894Z",
            "publishedAt": "2021-01-01T16:52:46.890Z",
            "authorId": 1,
            "readTime": 0,
            "languageId": 1,
            "publishedLanguageLevel": "NATIVE",
            "longitude": null,
            "latitude": null
          }
        }
      ],
      "thanksCount": 21,
      "clapCount": 35,
    }
  },
  'update:own-only': {
    "handler": updateEmail,
    "data": {
      "user": {
        "id": 1,
        "name": "Jon Snow",
        "email": "j@n.com",
        "handle": "jsno",
        "userRole": "FREE_USER",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed ex enim. Phasellus laoreet rutrum ullamcorper. Donec tortor nisi, luctus nec volutpat ac, malesuada lobortis ante. Maecenas placerat egestas lobortis. Etiam et vulputate lacus. Proin vehicula, augue fermentum dignissim hendrerit, nunc orci tempor metus, vitae luctus dui nulla vitae metus.",
        "city": null,
        "country": null,
        "createdAt": "2020-11-02T16:15:20.313Z",
        "updatedAt": "2020-11-08T20:56:14.422Z",
        "profileImage": null
      },
      "own": [
        {
          "type": "POST_COMMENT",
          "notificationDate": "2021-01-02T22:21:27.236Z",
          "postComment": {
            "id": 6,
            "createdAt": "2021-01-02T22:21:27.236Z",
            "updatedAt": "2021-01-02T22:21:27.236Z",
            "body": "zup",
            "authorId": 6,
            "postId": 17,
            "post": {
              "id": 17,
              "title": "Zoop doop and boop",
              "body": "<p>this is a sentence which contains multiple words</p>",
              "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
              "excerpt": "this is a sentence which contains multipl",
              "status": "PUBLISHED",
              "createdAt": "2021-01-01T16:52:46.893Z",
              "updatedAt": "2021-01-01T16:52:46.894Z",
              "publishedAt": "2021-01-01T16:52:46.890Z",
              "authorId": 1,
              "readTime": 0,
              "languageId": 1,
              "publishedLanguageLevel": "NATIVE",
              "longitude": null,
              "latitude": null
            }
          },
          "post": {
            "id": 17,
            "title": "Zoop doop and boop",
            "body": "<p>this is a sentence which contains multiple words</p>",
            "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
            "excerpt": "this is a sentence which contains multipl",
            "status": "PUBLISHED",
            "createdAt": "2021-01-01T16:52:46.893Z",
            "updatedAt": "2021-01-01T16:52:46.894Z",
            "publishedAt": "2021-01-01T16:52:46.890Z",
            "authorId": 1,
            "readTime": 0,
            "languageId": 1,
            "publishedLanguageLevel": "NATIVE",
            "longitude": null,
            "latitude": null
          }
        },
        {
          "type": "THREAD_COMMENT",
          "notificationDate": "2021-01-02T22:21:27.236Z",
          "comment": {
            "id": 14,
            "createdAt": "2021-01-02T22:21:55.429Z",
            "updatedAt": "2021-01-02T22:21:55.429Z",
            "body": "But how many words exactly?",
            "authorId": 6,
            "threadId": 8,
            "thread": {
              "id": 8,
              "startIndex": 34,
              "endIndex": 42,
              "archived": false,
              "highlightedContent": "multiple",
              "postId": 17,
              "post": {
                "id": 17,
                "title": "Zoop doop and boop",
                "body": "<p>this is a sentence which contains multiple words</p>",
                "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
                "excerpt": "this is a sentence which contains multipl",
                "status": "PUBLISHED",
                "createdAt": "2021-01-01T16:52:46.893Z",
                "updatedAt": "2021-01-01T16:52:46.894Z",
                "publishedAt": "2021-01-01T16:52:46.890Z",
                "authorId": 1,
                "readTime": 0,
                "languageId": 1,
                "publishedLanguageLevel": "NATIVE",
                "longitude": null,
                "latitude": null
              }
            }
          },
          "thread": {
            "id": 8,
            "startIndex": 34,
            "endIndex": 42,
            "archived": false,
            "highlightedContent": "multiple",
            "postId": 17,
            "post": {
              "id": 17,
              "title": "Zoop doop and boop",
              "body": "<p>this is a sentence which contains multiple words</p>",
              "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
              "excerpt": "this is a sentence which contains multipl",
              "status": "PUBLISHED",
              "createdAt": "2021-01-01T16:52:46.893Z",
              "updatedAt": "2021-01-01T16:52:46.894Z",
              "publishedAt": "2021-01-01T16:52:46.890Z",
              "authorId": 1,
              "readTime": 0,
              "languageId": 1,
              "publishedLanguageLevel": "NATIVE",
              "longitude": null,
              "latitude": null
            }
          },
          "post": {
            "id": 17,
            "title": "Zoop doop and boop",
            "body": "<p>this is a sentence which contains multiple words</p>",
            "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
            "excerpt": "this is a sentence which contains multipl",
            "status": "PUBLISHED",
            "createdAt": "2021-01-01T16:52:46.893Z",
            "updatedAt": "2021-01-01T16:52:46.894Z",
            "publishedAt": "2021-01-01T16:52:46.890Z",
            "authorId": 1,
            "readTime": 0,
            "languageId": 1,
            "publishedLanguageLevel": "NATIVE",
            "longitude": null,
            "latitude": null
          }
        },
        {
          "type": "THREAD_COMMENT",
          "notificationDate": "2021-01-02T22:21:27.236Z",
          "comment": {
            "id": 15,
            "createdAt": "2021-01-02T22:22:16.332Z",
            "updatedAt": "2021-01-02T22:22:16.332Z",
            "body": "loop!",
            "authorId": 6,
            "threadId": 8,
            "thread": {
              "id": 8,
              "startIndex": 34,
              "endIndex": 42,
              "archived": false,
              "highlightedContent": "multiple",
              "postId": 17,
              "post": {
                "id": 17,
                "title": "Zoop doop and boop",
                "body": "<p>this is a sentence which contains multiple words</p>",
                "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
                "excerpt": "this is a sentence which contains multipl",
                "status": "PUBLISHED",
                "createdAt": "2021-01-01T16:52:46.893Z",
                "updatedAt": "2021-01-01T16:52:46.894Z",
                "publishedAt": "2021-01-01T16:52:46.890Z",
                "authorId": 1,
                "readTime": 0,
                "languageId": 1,
                "publishedLanguageLevel": "NATIVE",
                "longitude": null,
                "latitude": null
              }
            }
          },
          "thread": {
            "id": 8,
            "startIndex": 34,
            "endIndex": 42,
            "archived": false,
            "highlightedContent": "multiple",
            "postId": 17,
            "post": {
              "id": 17,
              "title": "Zoop doop and boop",
              "body": "<p>this is a sentence which contains multiple words</p>",
              "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
              "excerpt": "this is a sentence which contains multipl",
              "status": "PUBLISHED",
              "createdAt": "2021-01-01T16:52:46.893Z",
              "updatedAt": "2021-01-01T16:52:46.894Z",
              "publishedAt": "2021-01-01T16:52:46.890Z",
              "authorId": 1,
              "readTime": 0,
              "languageId": 1,
              "publishedLanguageLevel": "NATIVE",
              "longitude": null,
              "latitude": null
            }
          },
          "post": {
            "id": 17,
            "title": "Zoop doop and boop",
            "body": "<p>this is a sentence which contains multiple words</p>",
            "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
            "excerpt": "this is a sentence which contains multipl",
            "status": "PUBLISHED",
            "createdAt": "2021-01-01T16:52:46.893Z",
            "updatedAt": "2021-01-01T16:52:46.894Z",
            "publishedAt": "2021-01-01T16:52:46.890Z",
            "authorId": 1,
            "readTime": 0,
            "languageId": 1,
            "publishedLanguageLevel": "NATIVE",
            "longitude": null,
            "latitude": null
          }
        }
      ],
      "other": [],
      "thanksCount": 21,
      "clapCount": 35,
    }
  },
  'update:kitchen-sink': {
    "handler": updateEmail,
    "data": {
      "user": {
        "id": 1,
        "name": "Jon Snow",
        "email": "j@n.com",
        "handle": "jsno",
        "userRole": "FREE_USER",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed ex enim. Phasellus laoreet rutrum ullamcorper. Donec tortor nisi, luctus nec volutpat ac, malesuada lobortis ante. Maecenas placerat egestas lobortis. Etiam et vulputate lacus. Proin vehicula, augue fermentum dignissim hendrerit, nunc orci tempor metus, vitae luctus dui nulla vitae metus.",
        "city": null,
        "country": null,
        "createdAt": "2020-11-02T16:15:20.313Z",
        "updatedAt": "2020-11-08T20:56:14.422Z",
        "profileImage": null
      },
      "own": [
        {
          "type": "POST_COMMENT",
          "notificationDate": "2021-01-02T22:21:27.236Z",
          "postComment": {
            "id": 6,
            "createdAt": "2021-01-02T22:21:27.236Z",
            "updatedAt": "2021-01-02T22:21:27.236Z",
            "body": "zup",
            "authorId": 6,
            "postId": 17,
            "post": {
              "id": 17,
              "title": "Zoop doop and boop",
              "body": "<p>this is a sentence which contains multiple words</p>",
              "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
              "excerpt": "this is a sentence which contains multipl",
              "status": "PUBLISHED",
              "createdAt": "2021-01-01T16:52:46.893Z",
              "updatedAt": "2021-01-01T16:52:46.894Z",
              "publishedAt": "2021-01-01T16:52:46.890Z",
              "authorId": 1,
              "readTime": 0,
              "languageId": 1,
              "publishedLanguageLevel": "NATIVE",
              "longitude": null,
              "latitude": null
            }
          },
          "post": {
            "id": 17,
            "title": "Zoop doop and boop",
            "body": "<p>this is a sentence which contains multiple words</p>",
            "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
            "excerpt": "this is a sentence which contains multipl",
            "status": "PUBLISHED",
            "createdAt": "2021-01-01T16:52:46.893Z",
            "updatedAt": "2021-01-01T16:52:46.894Z",
            "publishedAt": "2021-01-01T16:52:46.890Z",
            "authorId": 1,
            "readTime": 0,
            "languageId": 1,
            "publishedLanguageLevel": "NATIVE",
            "longitude": null,
            "latitude": null
          }
        },
        {
          "type": "THREAD_COMMENT",
          "notificationDate": "2021-01-02T22:21:27.236Z",
          "comment": {
            "id": 14,
            "createdAt": "2021-01-02T22:21:55.429Z",
            "updatedAt": "2021-01-02T22:21:55.429Z",
            "body": "But how many words exactly?",
            "authorId": 6,
            "threadId": 8,
            "thread": {
              "id": 8,
              "startIndex": 34,
              "endIndex": 42,
              "archived": false,
              "highlightedContent": "multiple",
              "postId": 17,
              "post": {
                "id": 17,
                "title": "Zoop doop and boop",
                "body": "<p>this is a sentence which contains multiple words</p>",
                "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
                "excerpt": "this is a sentence which contains multipl",
                "status": "PUBLISHED",
                "createdAt": "2021-01-01T16:52:46.893Z",
                "updatedAt": "2021-01-01T16:52:46.894Z",
                "publishedAt": "2021-01-01T16:52:46.890Z",
                "authorId": 1,
                "readTime": 0,
                "languageId": 1,
                "publishedLanguageLevel": "NATIVE",
                "longitude": null,
                "latitude": null
              }
            }
          },
          "thread": {
            "id": 8,
            "startIndex": 34,
            "endIndex": 42,
            "archived": false,
            "highlightedContent": "multiple",
            "postId": 17,
            "post": {
              "id": 17,
              "title": "Zoop doop and boop",
              "body": "<p>this is a sentence which contains multiple words</p>",
              "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
              "excerpt": "this is a sentence which contains multipl",
              "status": "PUBLISHED",
              "createdAt": "2021-01-01T16:52:46.893Z",
              "updatedAt": "2021-01-01T16:52:46.894Z",
              "publishedAt": "2021-01-01T16:52:46.890Z",
              "authorId": 1,
              "readTime": 0,
              "languageId": 1,
              "publishedLanguageLevel": "NATIVE",
              "longitude": null,
              "latitude": null
            }
          },
          "post": {
            "id": 17,
            "title": "Zoop doop and boop",
            "body": "<p>this is a sentence which contains multiple words</p>",
            "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
            "excerpt": "this is a sentence which contains multipl",
            "status": "PUBLISHED",
            "createdAt": "2021-01-01T16:52:46.893Z",
            "updatedAt": "2021-01-01T16:52:46.894Z",
            "publishedAt": "2021-01-01T16:52:46.890Z",
            "authorId": 1,
            "readTime": 0,
            "languageId": 1,
            "publishedLanguageLevel": "NATIVE",
            "longitude": null,
            "latitude": null
          }
        },
        {
          "type": "THREAD_COMMENT",
          "notificationDate": "2021-01-02T22:21:27.236Z",
          "comment": {
            "id": 15,
            "createdAt": "2021-01-02T22:22:16.332Z",
            "updatedAt": "2021-01-02T22:22:16.332Z",
            "body": "loop!",
            "authorId": 6,
            "threadId": 8,
            "thread": {
              "id": 8,
              "startIndex": 34,
              "endIndex": 42,
              "archived": false,
              "highlightedContent": "multiple",
              "postId": 17,
              "post": {
                "id": 17,
                "title": "Zoop doop and boop",
                "body": "<p>this is a sentence which contains multiple words</p>",
                "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
                "excerpt": "this is a sentence which contains multipl",
                "status": "PUBLISHED",
                "createdAt": "2021-01-01T16:52:46.893Z",
                "updatedAt": "2021-01-01T16:52:46.894Z",
                "publishedAt": "2021-01-01T16:52:46.890Z",
                "authorId": 1,
                "readTime": 0,
                "languageId": 1,
                "publishedLanguageLevel": "NATIVE",
                "longitude": null,
                "latitude": null
              }
            }
          },
          "thread": {
            "id": 8,
            "startIndex": 34,
            "endIndex": 42,
            "archived": false,
            "highlightedContent": "multiple",
            "postId": 17,
            "post": {
              "id": 17,
              "title": "Zoop doop and boop",
              "body": "<p>this is a sentence which contains multiple words</p>",
              "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
              "excerpt": "this is a sentence which contains multipl",
              "status": "PUBLISHED",
              "createdAt": "2021-01-01T16:52:46.893Z",
              "updatedAt": "2021-01-01T16:52:46.894Z",
              "publishedAt": "2021-01-01T16:52:46.890Z",
              "authorId": 1,
              "readTime": 0,
              "languageId": 1,
              "publishedLanguageLevel": "NATIVE",
              "longitude": null,
              "latitude": null
            }
          },
          "post": {
            "id": 17,
            "title": "Zoop doop and boop",
            "body": "<p>this is a sentence which contains multiple words</p>",
            "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
            "excerpt": "this is a sentence which contains multipl",
            "status": "PUBLISHED",
            "createdAt": "2021-01-01T16:52:46.893Z",
            "updatedAt": "2021-01-01T16:52:46.894Z",
            "publishedAt": "2021-01-01T16:52:46.890Z",
            "authorId": 1,
            "readTime": 0,
            "languageId": 1,
            "publishedLanguageLevel": "NATIVE",
            "longitude": null,
            "latitude": null
          },
          "image": "https://res.cloudinary.com/journaly/image/upload/v1611105667/journaly/g22ftiryur5hfuwpqiwy.jpg"
        }
      ],
      "other": [
        {
          "type": "POST_COMMENT",
          "notificationDate": "2021-01-02T22:21:27.236Z",
          "postComment": {
            "id": 6,
            "createdAt": "2021-01-02T22:21:27.236Z",
            "updatedAt": "2021-01-02T22:21:27.236Z",
            "body": "zup",
            "authorId": 6,
            "postId": 17,
            "post": {
              "id": 17,
              "title": "Zoop doop and boop",
              "body": "<p>this is a sentence which contains multiple words</p>",
              "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
              "excerpt": "this is a sentence which contains multipl",
              "status": "PUBLISHED",
              "createdAt": "2021-01-01T16:52:46.893Z",
              "updatedAt": "2021-01-01T16:52:46.894Z",
              "publishedAt": "2021-01-01T16:52:46.890Z",
              "authorId": 1,
              "readTime": 0,
              "languageId": 1,
              "publishedLanguageLevel": "NATIVE",
              "longitude": null,
              "latitude": null
            },
          },
          "commentAuthor": "jsno1991",
          "post": {
            "id": 17,
            "title": "Zoop doop and boop",
            "body": "<p>this is a sentence which contains multiple words</p>",
            "bodySrc": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"this is a sentence which contains multiple words\"}]}]",
            "excerpt": "this is a sentence which contains multipl",
            "status": "PUBLISHED",
            "createdAt": "2021-01-01T16:52:46.893Z",
            "updatedAt": "2021-01-01T16:52:46.894Z",
            "publishedAt": "2021-01-01T16:52:46.890Z",
            "authorId": 1,
            "readTime": 0,
            "languageId": 1,
            "publishedLanguageLevel": "NATIVE",
            "longitude": null,
            "latitude": null
          },
          "image": "https://dlke4x4hpr6qb.cloudfront.net/sample-post-img.jpg"
        }
      ],
      "thanksCount": 49,
      "clapCount": 67,
    }
  }
}

const subcommand = process.argv[2]

if (subcommand === 'list') {
  console.log('Available scenarios:\n')

  for (let key in scenarios) {
    console.log(`  -  ${key}`)
  }

  console.log('\nUsed `npm run scenarios render <scenario>` to output the given scenario')
  process.exit(0)
} else if (subcommand === 'render') {
  const scenarioName = process.argv[3]

  if (!(scenarioName in scenarios)) {
    console.log(`Unrecognized scenario name "${scenarioName}". Try \`npm run scenarios list\` to see a list of available scenarios.`)
    process.exit(1)
  }

  const { handler, data } = scenarios[scenarioName]
  console.log(handler(data))
}

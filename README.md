# herpmanager-api

To create compound indexes for e.g. breeding events (that don't rely on Id's) use something like:

`db.breedingevents.createIndex({individual: 1, date: 1, mate: 1, comment: 1}, {unique: true})`

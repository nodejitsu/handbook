[![Nodejitsu Deploy Status](status)](https://webops.nodejitsu.com#nodejitsu/webhooks)

[status]: https://webhooks.nodejitsu.com/nodejitsu/handbook.png

# The Nodejitsu Handbook

**You can view the Handbook online at http://www.nodejitsu.com/docs**

Welcome to the Nodejitsu handbook. This document will help familiarize you with 
deploying your Node.js applications to the cloud while also providing detailed 
information about Nodejitsu's platform-specific features and about where to get 
help when you need it.

This is a living document which you can submit patches to at
[http://github.com/nodejitsu/handbook][repo].
Handbook content resides in [/content][content] and is easily accessed by using
several methods of [/index.js][handbook],

[repo]: http://github.com/nodejitsu/handbook
[content]: https://github.com/nodejitsu/handbook/tree/master/content
[handbook]: https://github.com/nodejitsu/handbook/blob/master/index.js

## Adding content
Writing a new article is done by simply adding a Markdown file to a subdirectory.
Several articles with related content can be placed under a seperate/new
subdirectory. Only markdown files included in the catalog. 

Note: each subdirectory is expected to at least have an index.md to generate a
proper catalog.

## Images
Images must be added to [/resource][resource]. Our [CDN][cdn] will ensure 
images are fetched from the repository and properly cached. Linking to an 
image from the article should be done as below:

```
![no applications](https://versions.nodejitsu.com/id:handbook/resources/noapps.png)
```

[resource]: https://github.com/nodejitsu/handbook/tree/master/resource
[cdn]: http://versions.nodejitsu.com

## Using the handbook as module
Simply add handbook as dependency to the package.json.

### Get markdown content
Call `handbook.get('/a-quickstart/hello-world')` with a relative path to the
article as first parameter, adding `.md` is optional.

will return an object with keys content, description, title and tags. For more
details about data for all keys, see [Description, title and tags][description].

``` javascript
{
  content: '##Some markdown content\n\nWhich is not parsed yet.',
  description: 'description parsed from content',
  title: 'title parsed from content',
  tags: [
    'top', 'ten', 'unique', 'descriptive', 'words', 
    'without', 'numbers', 'and', 'short', 'tags'
  ] 
}
```

[description]: #description-title-and-tags 

### Get the catalog
Call `handbook.catalogSync()` to aquire a complete catalog from content
(sychronously), which should return an object with paths, href's and titles.

``` javascript
{ 
  content: { 
    index: { 
      href: '',
      title: 'Handbook',
      path: '/var/www/nodejitsu/handbook/content' 
    } 
  },
  'content/support': { 
    index: { 
      href: '/support',
      title: 'Need Support?',
      path: '/var/www/nodejitsu/handbook/content/support' 
    } 
  },
  'content/a-quickstart': { 
    index: { 
      href: '/a-quickstart',
      title: 'Quickstart',
      path: '/var/www/nodejitsu/handbook/content/a-quickstart' 
    },
    faq: { 
      href: '/a-quickstart/faq',
      title: 'FAQ',
      path: '/var/www/nodejitsu/handbook/content/a-quickstart' 
    },
    'hello-world': { 
      href: '/a-quickstart/hello-world',
      title: 'Hello World: A Tutorial',
      path: '/var/www/nodejitsu/handbook/content/a-quickstart' 
    } 
  }
}
```

### Description, title and tags
Adding a description and title to the article is as easy as providing it at the
bottom of the content as per example. Omitting title and/or description is
possible as an empty string will be returned.

``` markdown
[meta:title]: <> (Using the jitsu CLI)
[meta:description]: <> (Some nice description about the content of the article)
```

Tags are parsed from the content by using Term Frequecy-Inverse Document
Frequency. Ten of the most descriptive tags are returned by default. Currently,
there is no support for custom tags.

[![Nodejitsu Deploy Status][status]](https://webops.nodejitsu.com#nodejitsu/webhooks)

[status]: https://webhooks.nodejitsu.com/nodejitsu/handbook.png

# The Nodejitsu Handbook

**You can view the Handbook online at https://www.nodejitsu.com/documentation**

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
Simply add handbook as dependency to the package.json, make sure to call the
handbook constructor, otherwise the [search index][lunr] will not be initialized
properly.

``` javascript
var Handbook = require('handbook'),
    documentation = new Handbook();

documentation.search('query');
```

[lunr]: #lunr-search 

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
Call `handbook.catalog()` to aquire a complete catalog from content
(sychronously), which should return an object with paths, href's, titles and
descriptions. If you want to generate the catalog asynchronously then supply a
callback to the function.

``` javascript
{ 
  index: { 
    index: { 
      href: '',
      title: 'Handbook',
      description: '# Introduction\n\nWelcome to the Nodejitsu handbook. This document will help familiarize you with\ndeploying your Node.js applications to the cloud while also providing detailed\ninformation about Nodejitsu\'s platform-specific features and about\nwhere to get help when you need it.',
      path: '/var/www/nodejitsu/handbook/content' 
    } 
  },
  support: { 
    index: { 
      href: '/support',
      title: 'Need Support?',
      description: '# Need Support?\n\nNodejitsu has a team of developers standing by to assist users with any issues\nthey may come across while deploying and administrating their web applications\non the Nodejitsu platform. Nodejitsu strives to have a lightning-fast turnaround\non all issues you may have!',
      path: '/var/www/nodejitsu/handbook/content/support' 
    } 
  }
}
```

### Description, title and tags
Adding a description and title to the article is as easy as providing it at the
bottom of the content as per example. Omitting title and/or description is
possible. The description will be parsed from the first lines of the content.
The title will be returned with an empty string.

``` markdown
[meta:title]: <> (Using the jitsu CLI)
[meta:description]: <> (Some nice description about the content of the article)
```

Tags are parsed from the content by using Term Frequecy-Inverse Document
Frequency. Ten of the most descriptive tags are returned by default. Currently,
there is no support for custom tags.

### Lunr search
Handbooks search engine is powered by [Lunr][github-lunr]. The handbook#search
method is a simple proxy to Lunr search.

[github-lunr]: https://github.com/olivernn/lunr.js 

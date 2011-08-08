# Appendix: Mailchimp Integration in Nodejitsu
<a name="apx:mailchimp"></a>

Nodejitsu features integration with [MailChimp](http://mailchimp.com). What is
MailChimp? In their [own words](http://mailchimp.com/about/):

> MailChimp makes it easy to design exceptional email campaigns, share them on
> social networks, integrate with web services you already use, manage
> subscribers and track your results. You'll love mixing and matching
> MailChimp's templates, features and integrations to suit your needs—think of
> it as your own personal newsletter publishing platform.

But what about integration? MailChimp integration with Nodejitsu means that you
can interact with your MailChimp lists using the same Nodejitsu API that you use
to interact with your apps!

## Getting Started

In order to set up the MailChimp integration, you have to
[sign up for MailChimp](http://mailchimp.com/signup) at
[their web site](http://mailchimp.com):

![](https://github.com/jesusabdullah/handbook/raw/master/fig/signup_page.png)

Once you sign up for MailChimp, they can help you get your bearings so you can
get to managing e-mail campaigns quick:

![](https://github.com/jesusabdullah/handbook/raw/master/fig/dashboard_help.png)

But, in order to integrate with Nodejitsu, what you need is an API key. The
easiest way to get an API key *right now* is to visit
<https://admin.mailchimp.com/account/api-key-popup>:

![](https://github.com/jesusabdullah/handbook/raw/master/fig/api_key_popup.png)

All you have to do to link your MailChimp account with your Nodejitsu account
is to copy-and-paste this API key into Nodejitsu's web application interface:

![](https://github.com/jesusabdullah/handbook/raw/master/fig/nodejitsu_dashboard_api_key.png)

Now you're good to go! Nodejitsu reports that I have one mailing list, and that
the two subscribers are Josh's mother and himself.

![](https://github.com/jesusabdullah/handbook/raw/master/fig/nodejitsu_dashboard.png)

## Interacting with your lists via the Nodejitsu JSON API: A Broad Overview

Like the rest of Nodejitsu's features, addon functionality can be accessed using
Nodejitsu's JSON API. For example, here's what happens when you get 
`/addons/:user-id`:

    $ curl --user 'jesusabdullah:abc123' http://api.nodejitsu.com/addons/jesusabdullah/


    { "_id": "jesusabdullah",
      "username": "jesusabdullah",
      "password-salt": "************",
      "password": "********************************",
      "email": "josh.holbrook@gmail.com",
      "addons-mailchimp-apikey": "********************************-us2",
      "_rev": "3-2df3731e8cc48d8e11511096dad140e8",
      "status": "active",
      "inviteCode": "***********",
      "resource": "User" }

In order to interact with the MailChimp add-on in particular, use the
`/addons/:user-id/signups` resource:

    $ curl --user 'jesusabdullah:abc123' http://api.nodejitsu.com/addons/jesusabdullah/signups


    { "lists": 
       { "total": 1,
         "data": 
          [ { "id": "f3b7d6450c",
              "web_id": 646837,
              "name": "Example Mailing List",
              "date_created": "2011-07-26 01:06:42",
              "email_type_option": false,
              "use_awesomebar": true,
              "default_from_name": "Joshua Holbrook",
              "default_from_email": "josh.holbrook@gmail.com",
              "default_subject": "Relevant AND Non-Spammy!",
              "default_language": "en",
              "list_rating": 0,
              "stats": 
               { "member_count": 2,
                 "unsubscribe_count": 0,
                 "cleaned_count": 0,
                 "member_count_since_send": 3,
                 "unsubscribe_count_since_send": 0,
                 "cleaned_count_since_send": 0,
                 "campaign_count": 0,
                 "grouping_count": 0,
                 "group_count": 0,
                 "merge_var_count": 0,
                 "avg_sub_rate": null,
                 "avg_unsub_rate": null,
                 "target_sub_rate": null,
                 "open_rate": null,
                 "click_rate": null },
              "modules": [] } ] } }

You can use the list ID to access the particular list information with
`/addons/:user-id/signups/:list-id/`:

    curl --user 'jesusabdullah:abc123' http://api.nodejitsu.com/addons/jesusabdullah/signups/f3b7d6450c


    { "total": 2,
      "data": 
       [ { "email": "holbrook@*********.net",
           "timestamp": "2011-07-26 01:08:11" },
         { "email": "josh@nodejitsu.com",
           "timestamp": "2011-07-26 01:09:11" } ] }

This confirms that Josh and his Mom are is in the example list.

## More API Commands:

* **Retrieve your API key:**

    GET /addons/:user-id/signups/apikey/

* **Set your API key:**

    PUT /addons/:user-id/signups/apikey/

* **Subscribe to a list:**

    POST /addons/:user-id/signups/:list-id/subscribe/

* **Unsubscribe from a list:**

    POST /addons/:user-id/signups/:list-id/unsubscribe/


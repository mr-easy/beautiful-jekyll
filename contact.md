---
layout: page
title: Contact
subtitle: Let's get connected
css: "/css/aboutme.css"
---

<form action="https://formspree.io/rishabhg1997@gmail.com" method="POST" class="form" id="contact-form">
  <p>Leave me a message:</p>
  <div class="row">
    <div class="col-xs-6">
      <input type="email" name="_replyto" class="form-control input-lg" placeholder="Email" title="Email">
    </div>
    <div class="col-xs-6">
      <input type="text" name="name" class="form-control input-lg" placeholder="Name" title="Name">
    </div>
  </div>
  <input type="hidden" name="_subject" value="New submission from deanattali.com">
  <textarea type="text" name="content" class="form-control input-lg" placeholder="Message" title="Message" required="required" rows="3"></textarea>
  <input type="text" name="_gotcha" style="display:none">
  <input type="hidden" name="_next" value="./aboutme?message=Your message was sent successfully, thanks!" />
  
  <div style="font-size: 12px; margin: -10px 0 10px;">Please be polite :)</div>
  
  <button type="submit" class="btn btn-lg btn-primary">Submit</button>
</form>
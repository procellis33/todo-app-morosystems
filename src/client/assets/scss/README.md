<div><strong style="color: red">SCSS 7-1 pattern</strong></div>
<br/>
<div>The <strong style="color: #00ffcc">base/</strong> directory contains the files that define the foundation of your site, such as the typography and norms you want applied site-wide, like box-sizing.</div>
<div><strong style="color: #00ffcc">utils/</strong> is where you store variables, functions, mixins, and %placeholders for extensions (if you use them).</div>
<div><strong style="color: #00ffcc">layouts/</strong> is where you store BEM blocks which contain things that can be reused, such as a form or header for large layouts.</div>
<div><strong style="color: #00ffcc">components/</strong> is where you store BEM blocks that are more self-contained, such as buttons.</div>
<div><strong style="color: #00ffcc">pages/</strong> contains blocks of code that only apply to a single page. While you use buttons all over the site, your home page has a quote section and a project grid that isn’t used anywhere else. In other words, pages/ are rules specific to a single page and won't be reused elsewhere.</div>
<div><strong style="color: #00ffcc">themes/</strong> is where you store thematic code, such as custom styling for Christmas or Halloween. This doesn't apply to the site we're creating. </div>
<div><strong style="color: #00ffcc">vendors/</strong> is a directory for third-party library style sheets such as Bootstrap or jquery UI. It's essentially for any CSS that has originated from outside the project. Using third party frameworks, such as Bootstrap, are common as they speed up site development with predefined style sheets for things like buttons and forms. </div>

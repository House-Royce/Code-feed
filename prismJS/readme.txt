instructions for PrismJS Syntax Highlighter

1. include the css and js files;
2. All code must be enclosed in 'pre' and 'code' tags : <pre><code>'insert code here'</code></pre>
3. <pre> must contain the following attributes:
	3.1 class="line-numbers"
	3.2 (optional future option)data-line-offset = "x" will set the first line to be x+1. If x is negative, first line is -x, but it will go to zero and then to 1. 
4. <code> must have the attribute class='language-languageName', where languaGename is the name of the language it's supposed to highlight. If you have lots of code snippets of the same name, you can put the class attrubute in a parent element (e.g. <body>) then it will mark all following languages in the same way.

This puzzle took a little time to figure out but we managed to spot the difference.
Here's a little test. Compare these two pieces of code:

<svg viewBox="0 0 100 100" preserveAspectRatio="none">
 <path d="M0,0 L50,100 L100,0 L0,0 Z" fill=”#000000”></path>
</svg>

And

<svg viewBox="0 0 100 100" preserveAspectRatio="none">
 <path d="M0,0 L50,100 L100,0 L0,0 Z" fill=”#000000”></path>
</svg>
The bottom one renders in a browser but the top one doesn’t.

What’s the difference?
Like a good lateral thinking puzzle or a bad cracker joke, this one could keep you going for days. Fortunately, I can swiftly put you out of your misery.

From an HTML perspective, there is no difference between these two sections of code, but you knew that of course.

The difference is in the way they were created. The top section was created programmatically and the bottom one was copied from the browser’s inspector window and pasted directly into an HTML file.

This issue kept me going for a few hours, searching Stack Overflow and wondering why my SVG wouldn’t render. It kept bringing me back to posts about missed attributes and properties. I knew none of that was the case because the code being generated worked if I copied and pasted it into a fresh file.

I meticulously checked my CSS, made sure no other items were obscuring the element and thought I had exhausted everything (I nearly gave up and created a PNG!) when I happened upon the knowledge that all elements are not created equal!

To the naked eye (or in this case, the browser’s inspector) the code was indistinguishable, but in the DOM there were far bigger differences.

I had originally generated the SVG thus:

document.createElement(‘svg’);
This method will create an SVG tag into which you can add your paths, rects and whatnots. The problem is that it will not render because the browser requires SVG elements to be created in a different namespace. When you write HTML code, the browser takes care of all this during the parse process, but when you add elements to the DOM programmatically using Javascript, you need to be a little more prescriptive.

So the correct method for creating any SVG element is...
document.createElementNS(‘http://www.w3.org/2000/svg’, ‘svg’);
Even though the parent element (‘SVG’) has established the namespace, each child element must also be created in this manner, otherwise it will not render in a browser, regardless of how ‘correct’ the resulting HTML code looks.

This also applies to MathML, XUL and XBL elements (each has their respective namespace URIs). Only HTML elements can be created using the createElement method. For more information, check out the MDN documentation.
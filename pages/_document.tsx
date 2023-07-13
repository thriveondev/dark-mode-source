import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-white dark:bg-black'>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function () {
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    if (newTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else if (newTheme === 'light') {
                      document.documentElement.classList.remove('dark');
                    }
                  }

                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                  window.__preferredTheme = 'auto';
                  try {
                    var preferredTheme = localStorage.getItem('theme');
                    if (preferredTheme) {
                      window.__preferredTheme = preferredTheme;
                    }
                  } catch (err) { }

                  window.__setPreferredTheme = function(newTheme) {
                    window.__preferredTheme = newTheme;
                    if (newTheme === 'auto') {
                      setTheme(darkQuery.matches ? 'dark' : 'light');
                      try {
                        localStorage.removeItem('theme');
                      } catch (err) { }
                    } else {
                      setTheme(newTheme);
                      try {
                        localStorage.setItem('theme', newTheme);
                      } catch (err) { }
                    }
                  };

                  var initialTheme = window.__preferredTheme;

                  if (initialTheme === 'auto') {
                    initialTheme = darkQuery.matches ? 'dark' : 'light';
                  }
                  setTheme(initialTheme);

                  darkQuery.addEventListener('change', function (e) {
                    if (window.__preferredTheme === 'auto') {
                      setTheme(e.matches ? 'dark' : 'light');
                    }
                  });
                })();
              `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

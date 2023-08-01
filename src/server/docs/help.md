```js
app.get('/', async (req, res) => {
  const deviceInfo = req.useragent;
  const ipAddress = req.ip;

  try {
    // Save the request data to the database
    await UserRequest.create({
      userAgent: deviceInfo.source,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      isMobile: deviceInfo.isMobile,
      ipAddress,
    });

    // Your response handling goes here
    res.send('Request data saved successfully!');
  } catch (error) {
    // Handle any errors that may occur during database interaction
    console.error('Error saving request data:', error);
    res.status(500).send('An error occurred while saving request data.');
  }
});
```

```bash
npm install --save-exact --save react react-dom next typescript @types/react @types/node @types/react-dom tailwindcss postcss autoprefixer eslint eslint-config-next
```

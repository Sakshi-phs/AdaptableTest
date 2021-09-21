// Per Angular team recommendation we should delete the prepublishOnly script if we
// want to publish Ivy compiled libraries to our own internal hosted npm registries.
//
// https://github.com/angular/angular/issues/37973#issuecomment-656179491
const fs = require('fs');

const deletePrepublishOnly = (libraryNames) => {
  libraryNames.forEach((libraryName) => {
    try {
      const filePath = `./dist/${libraryName}/package.json`;
      const rawFile = fs.readFileSync(filePath);
      const packageJson = JSON.parse(rawFile);
      delete packageJson['scripts']['prepublishOnly'];
      fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
    } catch (err) {
      console.log(`Ivy package fix failed: ${err}`);
      process.exit();
    }
  });
};

// TODO: Add library names to this array. E.g deletePrepublishOnly(['ui-user-admin-lib', 'some-other-lib-we-publish']);
deletePrepublishOnly([]);

(function (global) {

    var paths = {
        'npm:': '../node_modules/'
    };

    var map = {
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
        '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',
        "@angular2-material": "npm:@angular2-material",
        "@ng2-dynamic-forms": "npm:@ng2-dynamic-forms",
        "angular2-in-memory-web-api": "npm:angular2-in-memory-web-api",
        "app": "app",
        "primeng": "npm:primeng",
        "rxjs": "npm:rxjs"
    };

    // packages tells the System loader how to load when no filename and/or no extension is indicated
    var packages = {
        "angular2-in-memory-web-api": {
            defaultExtension: "js"
        },
        "app": {
            main: "main.js",
            defaultExtension: "js"
        },
        "rxjs": {
            defaultExtension: "js"
        },
        "primeng": {
            defaultExtension: "js"
        }
    };

    var angularMaterialPackageNames = [
        "button",
        "checkbox",
        "core",
        "input",
        "radio"
    ];

    var ng2DynamicFormsPackageNames = [
        "@ng2-dynamic-forms/core",
        "@ng2-dynamic-forms/ui-basic",
        "@ng2-dynamic-forms/ui-bootstrap",
        "@ng2-dynamic-forms/ui-foundation",
        "@ng2-dynamic-forms/ui-material",
        "@ng2-dynamic-forms/ui-primeng"
    ];

    angularMaterialPackageNames.forEach(function (packageName) {

        packages["@angular2-material/" +packageName] = {
            format: "cjs",
            main: packageName +".js",
            defaultExtension: "js"
        };
    });

    ng2DynamicFormsPackageNames.forEach(function (packageName) {

        packages[packageName] = {
            main: "index.js",
            defaultExtension: "js"
        };
    });

    var config = {
        paths: paths,
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);
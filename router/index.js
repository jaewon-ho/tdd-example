const fs = require('fs');
const express = require('express');

const loadRouters = (dir) => {
    const routers = {};
    fs.readdirSync(dir).forEach((target) => {
        if(target.indexOf('index.js') >= 0) return

        const importPath = `${dir}/${target}`;
        const basePath = target.substring(0, target.indexOf("."));
        const router  = require(`${importPath}`);

        routers[basePath] = router;
    });
    return routers;
}

module.exports = loadRouters(__dirname);
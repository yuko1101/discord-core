const fs = require('fs');

module.exports = class ConfigFile {
    constructor(filePath, defaultConfig, route = []) {
        this.filePath = filePath;
        this.defaultConfig = defaultConfig;
        this.data = defaultConfig;
        this.route = route;
    }

    /**
     * @param {Boolean} [compact=false]
     * @returns {Promise<ConfigFile>}
     */
    async save(compact = false) {
        var text;
        if (compact) {
            text = JSON.stringify(this.data);
        } else {
            text = JSON.stringify(this.data, null, 4);
        }
        fs.writeFileSync(this.filePath, text);
        return this;
    }

    /**
     * @returns {Promise<ConfigFile>}
     */
    async load() {
        if (!fs.existsSync(this.filePath)) {
            await this.save();
        }
        const text = fs.readFileSync(this.filePath, "utf-8");
        try {
            this.data = JSON.parse(text);
        } catch (e) {
            console.error(e);
        }
        return this;
    }

    /**
     * @param {String|Number} key
     * @param {*} value
     * @returns {ConfigFile}
     */
    set(key, value) {
        if (typeof key === "number" && !Array.isArray(this.getCurrentRouteObject())) {
            if (this.route.length === 0) {
                this.data = [];
            } else {
                this.getParentRouteObject()[this.route[this.route.length - 1]] = [];
            }
        }
        this.getCurrentRouteObject()[key] = value;
        return this
    }

    /**
     * @param {*} value
     * @returns {ConfigFile}
     */
    add(value) {
        if (this.getCurrentRouteObject() === undefined) {
            if (this.route.length === 0) {
                this.data = [value];
            } else {
                this.getParentRouteObject()[this.route[this.route.length - 1]] = [value];
            }
        } else if (Array.isArray(this.getCurrentRouteObject())) {
            if (this.route.length === 0) {
                this.data = [...this.data, value];
            }
            else {
                this.getParentRouteObject()[this.route[this.route.length - 1]] = [...this.getParentRouteObject()[this.route[this.route.length - 1]], value];
            }
        }
        return this;
    }

    /**
     * @param {String|Number} key
     * @returns {*}
     */
    getValue(key = null) {
        if (key === null) {
            return this.getParentRouteObject()[this.route[this.route.length - 1]];
        }
        return this.getCurrentRouteObject()[key];
    }

    /**
     * @param {String|Number} key
     * @returns {ConfigFile}
     */
    get(...key) {
        const newRoute = [...this.route, ...key];
        return new ConfigFile(this.filePath, this.data, newRoute);
    }

    /**
     * 
     * @param  {...String|Number} key 
     * @returns {Boolean}
     */
    has(...key) {
        const newRoute = [...this.route, ...key];
        var obj = this.data;
        for (var i = 0; i < newRoute.length; i++) {
            obj = obj[newRoute[i]];
            if (obj === undefined) {
                return false;
            }
        }
        return true;
    }

    /**
     * @returns {Boolean}
     */
    exists() {
        return this.has(...this.route);
    }

    /**
     * @returns {ConfigFile}
     */
    resetData() {
        this.data = this.defaultConfig;
        return this;
    }

    /**
     * @returns {ConfigFile}
     */
    resetPath() {
        this.route = [];
        return this;
    }


    /**
     * @private
     */
    getCurrentRouteObject() {
        var obj = this.data;
        for (var i = 0; i < this.route.length; i++) {
            obj = obj[this.route[i]];
        }
        return obj;
    }
    /**
     * @private
     */
    getParentRouteObject() {
        var obj = this.data;
        for (var i = 0; i < this.route.length - 1; i++) {
            obj = obj[this.route[i]];
        }
        return obj;
    }

}
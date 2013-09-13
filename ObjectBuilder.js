Object.property = function(instance, name, type, value, isReadOnly) {
    types = {
        number: function(v) { 
            return v instanceof Number || typeof v === typeof 1;
        },
        string: function(v) { 
            return v instanceof String || typeof v === typeof "";
        },
        date: function(v) { 
            return v instanceof Date || typeof v === typeof "";
        },
        array: function(v) { 
            return v instanceof Array || v instanceof [];
        },
        object: function(v) { 
            return v instanceof Object || v instanceof {} || typeof v === typeof {};
        }
    };
    instance[name] = function(val) {
        if (val) {
            var typeInfo = typeof val;
            if (isReadOnly) {
                throw new Error("The property " + name + " is read-only.");
            } else {
                if (types[type](val)) {
                    value = val;
                    return instance;
                } else {
                    throw new Error("Type is wrong. Found '" + typeInfo + "' while expected '" + type + "'");
                }
            }
        } else {
            return value;
        }
    };
};

Object.method = function(instance, name, calling) {
    instance[name] = calling;
};

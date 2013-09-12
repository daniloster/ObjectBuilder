var A = function(firstName, lastName, idade) {
    Object.property(this, "firstName", "string", firstName, true);
    Object.property(this, "lastName", "string", lastName, true);
    Object.property(this, "idade", "number", idade, false);
    Object.property(this, "fullName", function(prefix) {
        return (prefix ? prefix + " ": "") + this.firstName() + " " + this.lastName();
    });
};

Object.property = function(instance, name, typeOrFunction, value, isReadOnly) {
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
    if (typeof typeOrFunction === typeof function(){}) {
        instance[name] = typeOrFunction;
    } else {
        instance[name] = function(val) {
            if (val) {
                var typeInfo = typeof val;
                if (isReadOnly) {
                    throw new Error("The property " + name + " is read-only.");
                } else {
                    if (types[typeOrFunction](val)) {
                        value = val;
                        return instance;
                    } else {
                        throw new Error("Type is wrong. Found '" + typeInfo + "' while expected '" + typeOrFunction + "'");
                    }
                }
            } else {
                return value;
            }
        };
    }
};

try { 
    var a = new A("Danilo", "Castro", 29);
    console.log(a);
    document.getElementById("sample-1").innerHTML = a.idade();
    document.getElementById("sample-2").innerHTML = a.idade(22).idade();
    document.getElementById("sample-3").innerHTML = a.firstName();
    document.getElementById("sample-31").innerHTML = a.fullName();
    document.getElementById("sample-32").innerHTML = a.fullName("Sr. ");
    a.idade("asd asdasda");
} catch (e) {
    $("#sample-4").html("ERROR: " + e);
}

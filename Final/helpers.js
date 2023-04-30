//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const exportedMethods = {
    checkName (name, varName) {
        if (!name) throw `Error: You must supply a ${varName}!`;
        if (typeof name !== 'string') throw `Error: ${varName} must be a string!`;
        name = name.trim();
        if (name.length === 0)
          throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        if (!isNaN(name))
          throw `Error: ${name} is not a valid value for ${varName} as it only contains digits`;
        const regex = /\d+/g;
        if (name.length < 2 || name.length > 25) throw `Error: ${varName} cannot be less than 2 or more than 25`;
        if (regex.test(name)) throw `Error: ${varName} cannot contain digits`;
        return (name);
    },

    checkEmail (email) {
        if (!email) throw 'Error: You must provide a valid email';
        if (typeof email !== 'string') throw 'Error: email must be a string';
        email = email.trim();
        if (email.length === 0) throw 'Error: email cannot be empty string or string with just spaces';
        email = email.toLowerCase();
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(email)) throw 'Error: email not in correct format';
        return (email);
    },

    checkPassword (password) {
        if (!password) throw 'Error: You must provide a valid password';
        if (typeof password !== 'string') throw 'Error: password must be a string';
        if (password.match(/\s+/)) throw 'Error: password cannot have spaces';
        if (password.length < 8) throw 'Error: password length must be 8 letters long';
        if (!password.match(/[a-z]/)) throw 'Error: password must have one lowercase letter';
        if (!password.match(/[A-Z]/)) throw 'Error: password must have one uppercase letter';
        if (!password.match(/[0-9]/)) throw 'Error: password must have one number';
        if (!password.match(/[^a-zA-Z0-9\s]/)) throw 'Error: password must have one special character';
        return (password);
    }
}

export default exportedMethods;
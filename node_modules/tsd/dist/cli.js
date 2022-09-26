#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow_1 = __importDefault(require("meow"));
const formatter_1 = __importDefault(require("./lib/formatter"));
const lib_1 = __importDefault(require("./lib"));
const cli = (0, meow_1.default)(`
	Usage
	  $ tsd [path]

	  The given directory must contain a package.json and a typings file.

	Info
	  --help         Display help text
	  --version      Display version info

	Options
	  --typings  -t  Type definition file to test  [Default: "types" property in package.json]
	  --files    -f  Glob of files to test         [Default: '/path/test-d/**/*.test-d.ts' or '.tsx']

	Examples
	  $ tsd /path/to/project

	  $ tsd --files /test/some/folder/*.ts --files /test/other/folder/*.tsx

	  $ tsd

	    index.test-d.ts
	    ✖  10:20  Argument of type string is not assignable to parameter of type number.
`, {
    flags: {
        typings: {
            type: 'string',
            alias: 't',
        },
        files: {
            type: 'string',
            alias: 'f',
            isMultiple: true,
        },
    },
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cwd = cli.input.length > 0 ? cli.input[0] : process.cwd();
        const typingsFile = cli.flags.typings;
        const testFiles = cli.flags.files;
        const options = { cwd, typingsFile, testFiles };
        const diagnostics = yield (0, lib_1.default)(options);
        if (diagnostics.length > 0) {
            throw new Error((0, formatter_1.default)(diagnostics));
        }
    }
    catch (error) {
        if (error && typeof error.message === 'string') {
            console.error(error.message);
        }
        process.exit(1);
    }
}))();

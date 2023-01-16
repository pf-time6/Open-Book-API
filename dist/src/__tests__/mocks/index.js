"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedInvalidPasswordSession = exports.mockedInvalidEmailSession = exports.mockedInvalidBodySession = exports.mockedCommonAuthorSession = exports.mockedAdminAuthorSession = exports.mockedAdminAuthorResponse = exports.mockedAdminAuthorRequest = exports.mockedCommonAuthorResponse = exports.mockedCommonAuthorRequest = void 0;
const author_mocks_1 = require("./integration/author.mocks");
Object.defineProperty(exports, "mockedCommonAuthorRequest", { enumerable: true, get: function () { return author_mocks_1.mockedCommonAuthorRequest; } });
Object.defineProperty(exports, "mockedCommonAuthorResponse", { enumerable: true, get: function () { return author_mocks_1.mockedCommonAuthorResponse; } });
Object.defineProperty(exports, "mockedAdminAuthorRequest", { enumerable: true, get: function () { return author_mocks_1.mockedAdminAuthorRequest; } });
Object.defineProperty(exports, "mockedAdminAuthorResponse", { enumerable: true, get: function () { return author_mocks_1.mockedAdminAuthorResponse; } });
const session_mocks_1 = require("./integration/session.mocks");
Object.defineProperty(exports, "mockedAdminAuthorSession", { enumerable: true, get: function () { return session_mocks_1.mockedAdminAuthorSession; } });
Object.defineProperty(exports, "mockedCommonAuthorSession", { enumerable: true, get: function () { return session_mocks_1.mockedCommonAuthorSession; } });
Object.defineProperty(exports, "mockedInvalidBodySession", { enumerable: true, get: function () { return session_mocks_1.mockedInvalidBodySession; } });
Object.defineProperty(exports, "mockedInvalidEmailSession", { enumerable: true, get: function () { return session_mocks_1.mockedInvalidEmailSession; } });
Object.defineProperty(exports, "mockedInvalidPasswordSession", { enumerable: true, get: function () { return session_mocks_1.mockedInvalidPasswordSession; } });
//# sourceMappingURL=index.js.map
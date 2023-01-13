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
Object.defineProperty(exports, "__esModule", { value: true });
const createPagesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    //const data = await createPagesService(req.body);
    //return res.status(201).json(data);
    return res.status(420).json({ message: `Just chill, work in progress! ${bookId}` });
});
exports.default = createPagesController;
//# sourceMappingURL=createPages.controller.js.map
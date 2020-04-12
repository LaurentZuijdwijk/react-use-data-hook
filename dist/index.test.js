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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_hooks_1 = require("@testing-library/react-hooks");
var index_1 = require("./index");
test("should use the useFetchDataHook -- happy path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var dataFn, _a, result, waitForNextUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dataFn = function (id) { return Promise.resolve(id * 2); };
                _a = react_hooks_1.renderHook(function () {
                    return index_1["default"]({ fn: dataFn }, 1);
                }), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate;
                expect(result.current.loading).toBe(true);
                expect(result.current.data).toBe(null);
                expect(result.current.error).toBe(null);
                return [4 /*yield*/, waitForNextUpdate()];
            case 1:
                _b.sent();
                expect(result.current.data).toBe(2);
                expect(result.current.loading).toBe(false);
                react_hooks_1.act(function () {
                    result.current.refetch(2);
                });
                expect(result.current.loading).toBe(true);
                return [4 /*yield*/, waitForNextUpdate()];
            case 2:
                _b.sent();
                expect(result.current.data).toBe(4);
                expect(result.current.loading).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
test("should use the useFetchDataHook -- without initial fetch", function () { return __awaiter(void 0, void 0, void 0, function () {
    var cnt, dataFn, _a, result, waitForNextUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cnt = 0;
                dataFn = function (id) {
                    cnt++;
                    return Promise.resolve("some data" + cnt);
                };
                _a = react_hooks_1.renderHook(function () {
                    return index_1["default"]({ fn: dataFn, initialFetch: false });
                }), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate;
                expect(result.current.loading).toBe(false);
                expect(result.current.data).toBe(null);
                expect(result.current.error).toBe(null);
                react_hooks_1.act(function () {
                    result.current.refetch();
                });
                expect(result.current.loading).toBe(true);
                return [4 /*yield*/, waitForNextUpdate()];
            case 1:
                _b.sent();
                expect(result.current.data).toBe("some data1");
                expect(result.current.loading).toBe(false);
                react_hooks_1.act(function () {
                    result.current.refetch();
                });
                expect(result.current.loading).toBe(true);
                return [4 /*yield*/, waitForNextUpdate()];
            case 2:
                _b.sent();
                expect(result.current.data).toBe("some data2");
                expect(result.current.loading).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
test("should use the useFetchDataHook -- service rejects", function () { return __awaiter(void 0, void 0, void 0, function () {
    var dataFn, _a, result, waitForNextUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dataFn = function (id) { return Promise.reject("Oops, error"); };
                _a = react_hooks_1.renderHook(function () {
                    return index_1["default"]({ fn: dataFn }, 1);
                }), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate;
                expect(result.current.loading).toBe(true);
                expect(result.current.data).toBe(null);
                expect(result.current.error).toBe(null);
                return [4 /*yield*/, waitForNextUpdate()];
            case 1:
                _b.sent();
                expect(result.current.loading).toBe(false);
                expect(result.current.data).toBe(null);
                expect(result.current.error).toBe("Oops, error");
                return [2 /*return*/];
        }
    });
}); });
test("should use the useFetchDataHook -- cancel slow responses", function () { return __awaiter(void 0, void 0, void 0, function () {
    var cnt, timeout, dataFn, _a, result, waitForNextUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cnt = 0;
                dataFn = function (id) {
                    return new Promise(function (resolve, reject) {
                        cnt++;
                        if (cnt === 1)
                            timeout = 200;
                        else
                            timeout = 100;
                        setTimeout(function () {
                            resolve("data" + cnt);
                        }, timeout);
                    });
                };
                _a = react_hooks_1.renderHook(function () {
                    return index_1["default"]({ fn: dataFn, initialFetch: true }, 1);
                }), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate;
                expect(result.current.loading).toBe(true);
                expect(result.current.data).toBe(null);
                expect(result.current.error).toBe(null);
                react_hooks_1.act(function () {
                    result.current.refetch();
                });
                return [4 /*yield*/, waitForNextUpdate()];
            case 1:
                _b.sent();
                expect(result.current.loading).toBe(false);
                expect(result.current.error).toBe(null);
                expect(result.current.data).toBe("data2");
                return [2 /*return*/];
        }
    });
}); });
test("should use the useFetchDataHook -- doesn't reject if cancelled", function () { return __awaiter(void 0, void 0, void 0, function () {
    var cnt, timeout, dataFn, _a, result, waitForNextUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cnt = 0;
                dataFn = function (id) {
                    return new Promise(function (resolve, reject) {
                        cnt++;
                        if (cnt === 1)
                            timeout = 200;
                        else
                            timeout = 100;
                        setTimeout(function () {
                            if (cnt === 1)
                                reject("Oops, error");
                            else
                                resolve("data");
                        }, timeout);
                    });
                };
                _a = react_hooks_1.renderHook(function () {
                    return index_1["default"]({ fn: dataFn, initialFetch: true }, 1);
                }), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate;
                expect(result.current.loading).toBe(true);
                expect(result.current.data).toBe(null);
                expect(result.current.error).toBe(null);
                react_hooks_1.act(function () {
                    result.current.refetch();
                });
                return [4 /*yield*/, waitForNextUpdate()];
            case 1:
                _b.sent();
                expect(result.current.loading).toBe(false);
                expect(result.current.error).toBe(null);
                expect(result.current.data).toBe("data");
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.test.js.map
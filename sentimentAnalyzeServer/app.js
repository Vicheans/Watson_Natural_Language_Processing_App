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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const v1_1 = __importDefault(require("ibm-watson/natural-language-understanding/v1"));
const auth_1 = require("ibm-watson/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.static("client/build"));
const getNLUInstance = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let apikey = process.env.API_KEY;
        let serviceUrl = process.env.API_URL;
        const nlu = new v1_1.default({
            version: "2021-08-01",
            authenticator: new auth_1.IamAuthenticator({
                apikey,
            }),
            serviceUrl,
            disableSslVerification: true,
        });
        return nlu;
    }
    catch (err) {
        throw err;
    }
});
app.get("/", (req, res) => {
    res.render("index.html");
});
app.get("/url/emotion", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try { // res.send("Welcome Brother")
        // let urlToAnalyze  = req.query.url;
        let urlToAnalyze = req.query.url;
        const analyzeParams = {
            url: urlToAnalyze,
            features: {
                keywords: {
                    emotion: true,
                    limit: 1
                }
            }
        };
        const nlu = yield getNLUInstance();
        let analysisResult = yield nlu.analyze(analyzeParams);
        if (!analysisResult)
            throw new Error('Could not complete operation');
        let result = {
            analysis: analysisResult.result.keywords[0].emotion,
            status: null, count: 2
        };
        console.log(result);
        res.send(result);
    }
    catch (err) {
        throw err;
    }
}));
app.get('/url/sentiment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let urlToAnalyze = req.query.url;
        const analyzeParams = {
            url: urlToAnalyze,
            features: {
                keywords: {
                    sentiment: true,
                    limit: 1,
                },
            },
        };
        const nlu = yield getNLUInstance();
        let analysisResult = yield nlu.analyze(analyzeParams);
        if (!analysisResult)
            throw new Error("Could not complete operation");
        let result = {
            analysis: analysisResult.result.keywords[0].sentiment,
            status: null,
            count: 2,
        };
        console.log(result);
        res.send(result);
    }
    catch (err) {
        throw err;
    }
}));
app.get('/text/emotion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let textToAnalyze = req.query.text;
        const analyzeParams = {
            text: textToAnalyze,
            features: {
                keywords: {
                    emotion: true,
                    limit: 1,
                },
            },
        };
        const nlu = yield getNLUInstance();
        let analysisResult = yield nlu.analyze(analyzeParams);
        if (!analysisResult)
            throw new Error("Could not complete operation");
        let result = {
            analysis: analysisResult.result.keywords[0].emotion,
            status: null,
            count: 2,
        };
        console.log("Emotion ", result);
        res.send(result);
    }
    catch (err) {
        throw err;
    }
}));
app.get("/text/sentiment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let textToAnalyze = req.query.text;
        console.log(textToAnalyze);
        const analyzeParams = {
            text: textToAnalyze,
            features: {
                keywords: {
                    sentiment: true,
                    limit: 1,
                },
            },
        };
        const nlu = yield getNLUInstance();
        let analysisResult = yield nlu.analyze(analyzeParams);
        if (!analysisResult)
            throw new Error("Could not complete operation");
        let result = {
            analysis: analysisResult.result.keywords[0].sentiment,
            status: null,
            count: 2,
        };
        console.log("Sentiment", result);
        res.send(analysisResult.result.keywords[0].sentiment);
    }
    catch (err) {
        throw err;
    }
}));
let server = app.listen(8080, () => {
    const { port } = server.address();
    console.log("Listening", port);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWdGO0FBQ2hGLG9EQUE0QjtBQUM1QixnREFBNEI7QUFFNUIsc0ZBQStEO0FBQy9ELDBDQUFtRDtBQUduRCxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQU0sR0FBRyxHQUFnQixJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUNuQyxNQUFNLElBQUksR0FBVyxJQUFJLENBQUM7QUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQVEsR0FBRSxDQUFDLENBQUM7QUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0FBSXhDLE1BQU0sY0FBYyxHQUFHLEdBQVMsRUFBRTtJQUM5QixJQUFHO1FBRUMsSUFBSSxNQUFNLEdBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUE7UUFDcEMsSUFBSSxVQUFVLEdBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUE7UUFFeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFHLENBQUM7WUFDbEIsT0FBTyxFQUFFLFlBQVk7WUFDckIsYUFBYSxFQUFFLElBQUksdUJBQWdCLENBQUM7Z0JBQ2xDLE1BQU07YUFDUCxDQUFDO1lBQ0YsVUFBVTtZQUNWLHNCQUFzQixFQUFFLElBQUk7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUM7S0FDZDtJQUFBLE9BQU0sR0FBRyxFQUFDO1FBQ1AsTUFBTSxHQUFHLENBQUM7S0FDYjtBQUNMLENBQUMsQ0FBQSxDQUFDO0FBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFPLEVBQUUsR0FBTyxFQUFFLEVBQUU7SUFDaEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzQixDQUFD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
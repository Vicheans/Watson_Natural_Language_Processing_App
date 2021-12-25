import express, { Application, Request as Req, Response as Res } from "express";
import dotenv from "dotenv";
import cors_app from "cors";
import { AddressInfo } from "net";
import NLU from "ibm-watson/natural-language-understanding/v1";
import { IamAuthenticator } from "ibm-watson/auth";


dotenv.config();

const app: Application = express();
const port: number = 3001;
app.use(cors_app());
app.use(express.static("client/build"));



const getNLUInstance = async () => {
    try{

        let apikey:string = "wOwffr2iEdu2BOisYz-lVvDq_8IYgE9xfbzlRG6PgXcM"
        let serviceUrl: string = "https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/edd172e3-7144-422b-a2fd-94681ec3a9cb";

        const nlu = new NLU({
          version: "2021-08-01",
          authenticator: new IamAuthenticator({
            apikey,
          }),
          serviceUrl,
          disableSslVerification: true,
        });
          
        return nlu;
    }catch(err){
        throw err;
    }
};

app.get("/", (req:Req, res:Res) => {
  res.render("index.html");
});

app.get("/url/emotion", async (req: Req, res: Res)=>{
   try{ // res.send("Welcome Brother")
    // let urlToAnalyze  = req.query.url;
    let urlToAnalyze = req.query.url;
    const analyzeParams = {
        url: urlToAnalyze,
        features: {
            keywords:{
                emotion: true,
                limit: 1
            }
        }
    }

    const nlu:any = await getNLUInstance();
    let analysisResult:any = await nlu.analyze(analyzeParams);
    if(!analysisResult) throw new Error ('Could not complete operation')
    let result = {
        analysis: analysisResult.result.keywords[0].emotion, 
        status: null, count: 2
    }
    console.log(result)
    res.send(result);
    
}
catch(err){
      throw err;
    }
})


app.get('/url/sentiment', async (req:Req, res:Res)=>{
    try{

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

        const nlu: any = await getNLUInstance();
        let analysisResult: any = await nlu.analyze(analyzeParams);
        if (!analysisResult) throw new Error("Could not complete operation");
        let result = {
          analysis: analysisResult.result.keywords[0].sentiment,
          status: null,
          count: 2,
        };
        console.log(result);
        res.send(result);

    } catch(err){
        throw err
    }
})

app.get('/text/emotion', async(req:Req, res:Res)=>{
    try{

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

        const nlu: any = await getNLUInstance();
        let analysisResult: any = await nlu.analyze(analyzeParams);
        if (!analysisResult) throw new Error("Could not complete operation");
        let result = {
          analysis: analysisResult.result.keywords[0].emotion,
          status: null,
          count: 2,
        };
        console.log("Emotion ",result);
        res.send(result);
    } catch(err){
        throw err
    }
})

app.get("/text/sentiment", async (req: Req, res: Res) => {
  try {

    let textToAnalyze = req.query.text;
    console.log(textToAnalyze)
    const analyzeParams = {
      text: textToAnalyze,
      features: {
        keywords: {
          sentiment: true,
          limit: 1,
        },
      },
    };

    const nlu: any = await getNLUInstance();
    let analysisResult: any = await nlu.analyze(analyzeParams);
    if (!analysisResult) throw new Error("Could not complete operation");
    let result = {
      analysis:  analysisResult.result.keywords[0].sentiment,
      status: null,
      count: 2,
    };
    console.log("Sentiment", result);
    res.send(analysisResult.result.keywords[0].sentiment);
  } catch (err) {
    throw err;
  }
});

let server = app.listen(8080, () => {
  const { port } = server.address() as AddressInfo;
  console.log("Listening", port);
});
exports.verifyWebhook = (req, res) => {
    // Parse os parâmetros da query string
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Verifique se o modo e o token estão presentes na query string
    if (token) {
        // Verifique se o modo e o token são os esperados
        if (mode === 'subscribe' && token === process.env.GRAPH_API_TOKEN) {
            // Responda com o token de desafio da solicitação
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responda com '403 Forbidden' se o token não corresponder
            res.sendStatus(403);
        }
    } else {
        // Responda com '400 Bad Request' se os parâmetros estiverem faltando
        res.sendStatus(400);
    }
};


//TODO: Fazer o verification do Instagram... 



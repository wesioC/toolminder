const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000; // Porta do servidor
const upload = multer();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'pma',
  password: 'Toolbd!23',
  database: 'toolminder'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conexão ao banco de dados bem-sucedida');
});


app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      res.status(500).send('Erro ao buscar produtos no banco de dados');
      return;
    }

    res.json(results);
  });
});

app.get('/getalltools', (req, res) => {
  const sql = 'SELECT * FROM tools';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      res.status(500).send('Erro ao buscar produtos no banco de dados');
      return;
    }

    res.json(results);
  });
});

app.get('/getavailabletools', (req, res) => {
  const sql = 'SELECT * FROM tools WHERE toolQuantity > 0';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      res.status(500).send('Erro ao buscar produtos no banco de dados');
      return;
    }

    res.json(results);
  });
});

app.get('/getloans', (req, res) => {
  const sql = 'SELECT * FROM loan WHERE dateReturn IS NULL ORDER BY dateHand ASC';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      res.status(500).send('Erro ao buscar empréstimos no banco de dados');
      return;
    }

    res.json(results);
  });
});

app.get('/getloanshistory', (req, res) => {
  const sql = 'SELECT * FROM loan WHERE dateReturn IS NOT NULL ORDER BY dateHand ASC';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      res.status(500).send('Erro ao buscar empréstimos no banco de dados');
      return;
    }

    res.json(results);
  });
});

app.get('/getusername', (req, res) => {
  const sql = 'SELECT SUBSTRING_INDEX(nome, " ", 1) AS name FROM usuarios WHERE matricula = ?';

  db.query(sql, [req.query.matricula], (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      res.status(500).send('Erro ao buscar nome do usuário no banco de dados');
      return;
    }

    res.json(results);
  });
});

app.post('/login', (req, res) => {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({ error: 'Matrícula e senha são obrigatórias' });
  }

  const sql = 'SELECT * FROM usuarios WHERE matricula = ? AND senha = ?';
  db.query(sql, [matricula, senha], (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      return res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }

    if (results.length > 0) {
      // Usurio autenticado com sucesso
      return res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      // Credenciais inválidas
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

app.post('/addtools', async (req, res) => {
  const toolCode = req.body.toolCode;
  const toolName = req.body.toolName;
  const toolQuantity = req.body.toolQuantity;
  // console.log(toolCode, toolName, toolQuantity)

  if (!toolCode || !toolName || !toolQuantity) {
    return res.status(400).json({ error: 'Código, nome e quantidade são obrigatórios' });
  }

  const sql = 'INSERT INTO tools (toolCode, toolName, toolQuantity) VALUES (?, ?, ?)';
  db.query(sql, [toolCode, toolName, toolQuantity], (error, result) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      return res.status(500).json({ error: 'Erro ao adicionar a ferramenta no banco de dados' });
    }

    res.status(201).json({ message: 'Ferramenta adicionada com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});

app.post('/removetools', async (req, res) => {
  const toolCode = req.body.toolCode;
  // console.log(toolCode)

  if (!toolCode) {
    return res.status(400).json({ error: 'Código é obrigatório' });
  }

  const sql = 'DELETE FROM tools WHERE toolCode = ?';
  db.query(sql, [toolCode], (error, result) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      return res.status(500).json({ error: 'Erro ao remover a ferramenta no banco de dados' });
    }

    res.status(201).json({ message: 'Ferramenta removida com sucesso' });
  });
});

app.post('/edittools', async (req, res) => {
  const oldToolCode = req.body.oldToolCode; // Supondo que você tem o código antigo da ferramenta
  const toolCode = req.body.toolCode;
  const toolName = req.body.toolName;
  const toolQuantity = req.body.toolQuantity;

  if (!oldToolCode || !toolCode || !toolName || !toolQuantity) {
    return res.status(400).json({ error: 'Código antigo, código, nome e quantidade são obrigatórios' });
  }

  const sql = 'UPDATE tools SET toolCode = ?, toolName = ?, toolQuantity = ? WHERE toolCode = ?';
  db.query(sql, [toolCode, toolName, toolQuantity, oldToolCode], (error, result) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      return res.status(500).json({ error: 'Erro ao editar a ferramenta no banco de dados' });
    }

    res.status(201).json({ message: 'Ferramenta editada com sucesso' });
  });
});



app.post('/addloan', async (req, res) => {
  const toolCode = req.body.toolCode;
  const toolQuantity = req.body.toolQuantity;
  const toolName = req.body.toolName;

  const currentDate = new Date();
  const dateLoan = currentDate.toISOString().split('T')[0];

  const dateHand = req.body.dateHand;
  const receiver = req.body.receiver;
  const sender = req.body.sender;
  const receiverEmail = req.body.receiverEmail;
  const receiverPhone = req.body.receiverPhone;

  if (!toolCode || !toolQuantity || !dateLoan || !dateHand || !receiver || !sender || !receiverEmail || !toolName || !receiverPhone) {
    return res.status(400).json({ error: 'Código, quantidade, data de empréstimo, data de devolução, receptor e remetente são obrigatórios' });
  }

  const sqlInsertLoan = 'INSERT INTO loan (toolCode, toolName, toolQuantity, dateLoan, dateHand, receiver, receiverEmail, receiverPhone, sender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const sqlUpdateTool = 'UPDATE tools SET toolQuantity = toolQuantity - ? WHERE toolCode = ?';

  db.beginTransaction(function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao iniciar transação no banco de dados' });
    }

    db.query(sqlInsertLoan, [toolCode, toolName, toolQuantity, dateLoan, dateHand, receiver, receiverEmail, receiverPhone, sender], function (error, result) {
      if (error) {
        console.error('Erro na consulta SQL de inserção de empréstimo: ' + error.message);
        return db.rollback(() => {
          res.status(500).json({ error: 'Erro ao adicionar o emprstimo no banco de dados' });
        });
      }

      db.query(sqlUpdateTool, [toolQuantity, toolCode], function (updateError, updateResult) {
        if (updateError) {
          console.error('Erro na consulta SQL de atualização de ferramentas: ' + updateError.message);
          return db.rollback(() => {
            res.status(500).json({ error: 'Erro ao atualizar quantidade de ferramentas no banco de dados' });
          });
        }

        db.commit(async function (commitError) {
          if (commitError) {
            console.error('Erro ao cometer transação no banco de dados: ' + commitError.message);
            return db.rollback(() => {
              res.status(500).json({ error: 'Erro ao confirmar transaão no banco de dados' });
            });
          }

          let config =
          {
            service: "gmail",
            auth: {
              user: "ifrvcienciasagrarias@gmail.com",
              pass: "pzrpcxqxnwuoftpl"
            }
          }

          let transporter = nodemailer.createTransport(config)

          let message = {
            from: "ifrvcienciasagrarias@gmail.com",
            to: receiverEmail,
            subject: `O objeto ${toolName} foi emprestado com sucesso`,
            html: `
            <table style="width: 100%; max-width: 600px; font-family: Arial, sans-serif; border-collapse: collapse; background-color: #ffffff; color: #333;">
            <tr>
              <td style="padding: 20px; background-color: #018031; text-align: center; border-bottom: 4px solid #014d1a;">
                <img src="https://painel.toolminder.online/img/ToolMinder.svg" alt="ToolMinder Logo" style="width: 150px;">
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #018031;">ToolMinder</p>
                <p style="margin: 5px 0 10px; font-size: 14px;">Gerenciamento de Ferramentas e Materiais de Laboratório</p>
                <p style="margin: 0; font-size: 16px;">
                  <strong>Email:</strong> <a href="mailto:toolminder.rv@gmail.com" style="color: #018031; text-decoration: none;">toolminder.rv@gmail.com</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; background-color: #f9f9f9; border-top: 1px solid #ccc;">
                <p style="margin: 0; font-size: 16px; color: #333;">Olá ${receiver},</p>
                <p style="margin: 10px 0 0; font-size: 16px; color: #333;">
                  Você acabou de pegar emprestado o <strong>${toolName}</strong>. Não se esqueça de devolvê-lo até o dia <strong>${dateHand}</strong> ao laboratório de Ciências Agrrias.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; background-color: #f1f1f1; font-size: 12px; color: #666; text-align: center;">
                <p style="margin: 0;">Este e-mail foi enviado automaticamente pelo ToolMinder. Por favor, não responda a este e-mail. Se precisar de ajuda, entre em contato com o suporte.</p>
              </td>
            </tr>
          </table>
            `
          };


          try {
            await transporter.sendMail(message);
            res.status(201).json({ message: 'Empréstimo adicionado com sucesso' });
          } catch (err) {
            console.error('Erro ao enviar e-mail:', err);
            res.status(500).json({ error: 'Erro ao enviar e-mail' });
          }

          //res.status(201).json({ message: 'Empréstimo adicionado com sucesso' });
        });
      });
    });
  });
});

app.post('/updateloan', async (req, res) => {
  const loanCode = req.body.loanCode;
  const toolQuantity = req.body.toolQuantity;
  const currentDate = new Date();
  const dateReturn = currentDate.toISOString().split('T')[0];

  if (!loanCode) {
    return res.status(400).json({ error: 'Código do empréstimo é obrigatório' });
  }

  const sqlUpdateLoan = 'UPDATE loan SET dateReturn = ? WHERE loanCode = ?';
  const sqlFindToolCode = 'SELECT toolCode FROM loan WHERE loanCode = ?';
  const sqlUpdateToolQuantity = 'UPDATE tools SET toolQuantity = toolQuantity + ? WHERE toolCode = ?';

  db.beginTransaction(function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao iniciar transaão no banco de dados' });
    }

    db.query(sqlUpdateLoan, [dateReturn, loanCode], function (error, result) {
      if (error) {
        console.error('Erro na consulta SQL de atualizaão de empréstimo: ' + error.message);
        return db.rollback(() => {
          res.status(500).json({ error: 'Erro ao atualizar empréstimo no banco de dados' });
        });
      }

      db.query(sqlFindToolCode, [loanCode], function (findError, toolResult) {
        if (findError || toolResult.length === 0) {
          console.error('Erro ao encontrar o código da ferramenta: ' + (findError ? findError.message : 'Código do empréstimo não encontrado'));
          return db.rollback(() => {
            res.status(500).json({ error: 'Erro ao encontrar o código da ferramenta' });
          });
        }

        const toolCode = toolResult[0].toolCode;

        db.query(sqlUpdateToolQuantity, [toolQuantity, toolCode], function (updateError, updateResult) {
          if (updateError) {
            console.error('Erro na consulta SQL de atualizaão de quantidade de ferramentas: ' + updateError.message);
            return db.rollback(() => {
              res.status(500).json({ error: 'Erro ao atualizar quantidade de ferramentas no banco de dados' });
            });
          }

          db.commit(function (commitError) {
            if (commitError) {
              console.error('Erro ao cometer transação no banco de dados: ' + commitError.message);
              return db.rollback(() => {
                res.status(500).json({ error: 'Erro ao confirmar transação no banco de dados' });
              });
            }
            res.status(200).json({ message: 'Empréstimo atualizado com sucesso' });
          });
        });
      });
    });
  });
});


app.post('/enviarEmail', async (req, res) => {
  const { email, toolName, toolQuantity, dateHand, receiver } = req.body;
  // console.log(email, toolName, toolQuantity, dateHand, receiver)
  let config =
  {
    service: "gmail",
    auth: {
      user: "ifrvcienciasagrarias@gmail.com",
      pass: "pzrpcxqxnwuoftpl"
    }
  }

  let transporter = nodemailer.createTransport(config)

  let message = {
    from: "ifrvcienciasagrarias@gmail.com",
    to: email,
    subject: `Não esqueça de devolver o(a) ${toolName}`,
    html: `
    <table style="width: 100%; max-width: 600px; font-family: Arial, sans-serif; font-size: 14px; color: #333; border: 1px solid #018031; border-radius: 8px; overflow: hidden;">
    <tr style="background-color: #018031; color: #fff;">
      <td style="padding: 20px; text-align: center;">
        <h1 style="margin: 10px 0; font-size: 24px;">ToolMinder</h1>
        <p style="margin: 5px 0; font-size: 16px;">Gerenciamento de Ferramentas e Materiais de Laboratório</p>
      </td>
    </tr>
    <tr style="background-color: #f7f7f7;">
      <td style="padding: 20px;">
        <p style="margin: 0; font-size: 16px; color: #018031; font-weight: bold;">Prezado(a) ${receiver},</p>
        <p style="margin: 10px 0; font-size: 14px; color: #333;">
          Gostaríamos de lembrá-lo(a) sobre a devolução do objeto <strong>${toolName}</strong>, que está próximo do prazo limite de entrega, previsto para <strong>${dateHand}</strong> no laboratório de Ciências Agrárias.
        </p>
      </td>
    </tr>
    <tr style="background-color: #fff;">
      <td style="padding: 20px;">
        <p style="margin: 0; font-size: 14px; color: #666;">
          Este e-mail é uma gentil lembrança enviada automaticamente pelo ToolMinder. Por favor, não hesite em nos contatar caso necessite de qualquer assistência.
        </p>
      </td>
    </tr>
    <tr style="background-color: #018031; color: #fff;">
      <td style="padding: 10px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">Email: <a href="mailto:toolminder.rv@gmail.com" style="color: #fff; text-decoration: none;">toolminder.rv@gmail.com</a></p>
        <img src="https://painel.toolminder.online/img/ToolMinder.svg" alt="ToolMinder Logo" style="width: 150px; padding-top: 1%;">   
    </td>
    </tr>
  </table>  
    `
  }


  try {
    await transporter.sendMail(message);
    res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    res.status(500).json({ error: 'Erro ao enviar e-mail' });
  }

});


const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function unique(user){
    return new Promise((resolve, reject) =>{
      fs.readFile('db.txt', 'utf8', (err, data)=> {
          data.split('\n').map((data)=>{
            resolve(!data.split(',').includes('Alisson'));
          })
      })
    })
  }


async function addUser(name,year){
    const id = uuidv4();
    const data = `${id},${name},${year}\n`;


    unique(name).then(valid=>{
        if(valid){
            fs.appendFileSync('db.txt', data, 'utf8', (err)=>{
                if(err){
                    console.log('ERRO!', err);
                    return;
                }       
            })
            console.log('Usuário adicionado com sucesso!');
        } else{
            console.log('Usuário já cadastrado!'); 
        }        
    })

}






function obterUsuarios() {
    fs.readFile('db.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
      }
      const usuarios = data.split('\n');
      usuarios.forEach((usuario) => {
        const [id, nome, idade] = usuario.split(',');
        console.log(`ID: ${id}, Nome: ${nome}, Idade: ${idade}`);
      });
    });
}



addUser('Alisson','23');
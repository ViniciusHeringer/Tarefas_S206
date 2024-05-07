describe("Testes da criação de Usuario, Login, Logout, Mudança de Senha, Deleção e Senha Incorreta (falha) ", ()=>{
  it("Teste criação de usuario com sucesso", ()=>{
    criarUser()
  })

  it("Teste criação de usuario e logoff", ()=>{
    criarUser()
    cy.get('.menu_tick').click()
    cy.get('[data-label="log_out"]').click()
  })

  it("Teste criação de usuario, logout e login", ()=>{
    let infos = criarUser()
    cy.get('.menu_tick').click()
    cy.get('[data-label="log_out"]').click()
    cy.get('[href="/login"]').click()
    cy.get(':nth-child(3) > label > input').type(infos[0])
    cy.get(':nth-child(4) > label > input').type(infos[1])
    cy.get('.buttons > .button').click()
  })

  it("Mudança de senha", ()=>{
    let infos = criarUser()
    cy.get('.menu_tick').click()
    cy.get(':nth-child(3) > [href="/user/settings"]').click()
    cy.get('[href="/user/settings/password"]').click()
    cy.get(':nth-child(4) > label > input').click()
    cy.get(':nth-child(4) > label > input').type(infos[1])
    cy.get(':nth-child(5) > label > input').type(infos[1]+"2")
    cy.get(':nth-child(6) > label > input').type(infos[1]+"2")
    cy.get('.button').click()
  })

  it("Solicitar que a conta seja deletada", ()=>{
    let infos = criarUser()
    cy.get('.menu_tick').click()
    cy.get(':nth-child(3) > [href="/user/settings"]').click()
    cy.get('[href="/user/settings/delete-account"]').click()
    cy.get('label > input').type(infos[1])
    cy.get('.button').click()
    cy.get("label > input").type("delete " + infos[0])
    cy.get("textarea").type("Lorem Ipsum Schnoz")
    cy.get(".button").click()
  })


  it("Tentativa de logar com a senha errada (falha)", ()=>{
    let infos = criarUser()
    
    cy.get('.menu_tick').click()
    cy.get('[data-label="log_out"]').click()
    
    cy.get('[href="/login"]').click()
    cy.get(':nth-child(3) > label > input').type(infos[0])
    cy.get(':nth-child(4) > label > input').type(infos[1]+"Schnoz")
    cy.get('.buttons > .button').click()
    cy.get('li').should("contain.text", "Incorrect username or password")
  })

  function criarUser()
  {
    let data = new Date()
    let hora = data.getHours().toString()
    let minuto = data.getMinutes().toString()
    let seg = data.getSeconds().toString()
    let ID = hora + minuto + seg + "ID"
    let Senha = hora + minuto + seg + "Senha#"
    let Email = hora + minuto + seg + "@gmail.com"
    let infos = [ID, Senha, Email]

    cy.visit('https://itch.io')
    cy.get('.register_button').click()
    cy.get('.validated > .text_input').type(infos[0])
    cy.get(':nth-child(4) > label > .text_input').type(infos[1])
    cy.get(':nth-child(5) > label > .text_input').type(infos[1])
    cy.get(':nth-child(6) > label > .text_input').type(infos[2])
    cy.get(':nth-child(9) > label > input').click()  
    cy.get('.buttons > .button').click()
      
    return infos
  }
})

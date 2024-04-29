/// <reference = cypress>

describe("Testes da criação, resgistro e login", ()=>{
  it.skip("Teste criação de usuario com sucesso", ()=>{
    cy.visit('https://globalsqa.com/angularjs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type("Vini")
    cy.get('#Text1').type("Vini")
    cy.get('#username').type("Vini")
    cy.get('#password').type("Vini")
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text", "Registration successful")

  })

  it.skip("Teste criação de usuario com falha", ()=>{
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type("Vini")
    cy.get('#Text1').type("Vini")
    cy.get('#username').type("Vini")
    cy.get('.btn-primary').should("be.disabled")
  })

  it.skip("Teste de login com sucesso", ()=>{
    let infos = criarUser()
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type (infos[0])
    cy.get('#password').type (infos[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should("contain.text", infos[0])
  })

  it("Teste de deletar user e tentar logar novamente", ()=>{

    let infos = criarUser()
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type (infos[0])
    cy.get('#password').type (infos[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should("contain.text", infos[0])
    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    cy.get('#username').type (infos[0])
    cy.get('#password').type (infos[1])
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text", "Username or password is incorrect")
  })

  function criarUser(){
    let hora = new Date().getHours().toString()
    let minuto = new Date().getMinutes().toString()
    let seg = new Date().getSeconds().toString()
    let ID = hora + minuto + seg + "ID"
    let Senha = hora + minuto + seg + "Senha"
    let infos = [ID, Senha]


    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type(ID)
    cy.get('#Text1').type(ID)
    cy.get('#username').type(ID)
    cy.get('#password').type(Senha)
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text", "Registration successful")
    return infos
  }
})
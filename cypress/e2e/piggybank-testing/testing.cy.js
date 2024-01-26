describe('Geld overmaken naar elkaar', () => {
    it('Er wordt geld overgemaakt met juiste invoer', () => {
        cy.visit('http://localhost:3000/login');
        cy.contains("Cem").click();
        cy.contains("Overboeken").click();
        cy.get('select[name="toaccount"]').select('Sara Ravestein').should('have.value', '2');
        cy.get('input[name="amount"]').type(200);
        cy.get('textarea[name="description"]').type('Geld overmaken naar Sara het lenen van geld.');
        cy.get('.form-row button[type="submit"]').click();
        cy.get(".alert").should("contain", "Het is gelukt");
    });
    it('Er wordt een verkeerde invoer gedaan bij het bedrag', () => {
        cy.visit('http://localhost:3000/login');
        cy.contains("Sara").click();
        cy.contains("Overboeken").click();
        cy.get('select[name="toaccount"]').select('Melvin Webster').should('have.value', '1');
        cy.get('input[name="amount"]').type('abc');
        cy.get('textarea[name="description"]').type('Geld overmaken naar Melvin Webster voor de lunch.');
        cy.get('.form-row button[type="submit"]').click();
    });
    it('Er wordt een geen invoer gedaan bij het bedrag', () => {
        cy.visit('http://localhost:3000/login');
        cy.contains("Sophie").click();
        cy.contains("Overboeken").click();
        cy.get('select[name="toaccount"]').select('Cem Fuijk').should('have.value', '3');
        cy.get('textarea[name="description"]').type('Geld overmaken naar Cem voor avondeten.');
        cy.get('.form-row button[type="submit"]').click();
    });
    it('Er wordt een invoer gedaan bij het bedrag met te weinig saldo', () => {
        cy.visit('http://localhost:3000/login');
        cy.contains("Melvin").click();
        cy.contains("Overboeken").click();
        cy.get('select[name="toaccount"]').select('Cem Fuijk').should('have.value', '3');
        cy.get('input[name="amount"]').type(2000);
        cy.get('textarea[name="description"]').type('Geld overmaken naar Cem voor tweedehands fiets.');
        cy.get('.form-row button[type="submit"]').click();
    });
});

describe('Account gegevens wijzigen', () => {
    it('Account naam wordt met juiste invoer gewijzigd', () => {
        cy.visit('http://localhost:3000/login');
        cy.contains("Cem").click();
        cy.contains("Instellingen").click();
        cy.get('input[name="accountName"]').clear()
        cy.get('input[name="accountName"]').type("Rekening van Amber");
        cy.get('.form-row button[type="submit"]').click();
        cy.get(".alert").should("contain", "Het is gelukt");
    });
    it('Account naam wordt zonder invoer gewijzigd', () => {
        cy.visit('http://localhost:3000/login');
        cy.contains("Sophie").click();
        cy.contains("Instellingen").click();
        cy.get('input[name="accountName"]').clear()
        cy.get('.form-row button[type="submit"]').click();
    });
});
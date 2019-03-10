describe('player', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  context('without song', () => {
    beforeEach(() => {
      cy.setStorage('song', {})
    })

    it('default title', () => {
      cy
        .get('.player__title')
        .contains('No sound selected')
    });

    it('default duration', () => {
      cy
        .get('#player .player__duration')
        .contains('--:--:--')
    });

    it('buttons disabled', () => {
      cy.get('#player .player__play').should('be.disabled');
      cy.get('#player .player__seek').should('be.disabled');
    });
  })

  context('with song', () => {
    beforeEach(() => {
      cy.setStorage('song', {
        title: 'Jézus és a jelzőrakéta',
        url: '/jezusesajelzoraketa.mp3'
      })
    })

    it('should be render', () => {
      cy.get('#player');
    });

    it('render song url', () => {
      cy
        .get('#player .player__title')
        .contains('Jézus és a jelzőrakéta')
    });

    it('render song duration', () => {
      cy
        .get('#player .player__duration')
        .contains('00:05:46')
    });

    it('play sound', () => {
      cy.get('#player .player__play')
        .click();
        cy.get('#player .player__play').contains('Pause')
    });

    it('stop sound', () => {
      cy.get('#player .player__play')
        .click()
        .click()
      cy.get('#player .player__play').contains('Play')
    });

    it('has progressbar', () => {
      cy.get('#player .progress .progress__bar')
    });

    it('render current time', () => {
      cy.get('#player .player__play')
        .click()
      cy.get('#player .player__current')
        .contains('00:00:01')
    });

    it('progressbar display current position', () => {
      cy.get('#player .player__play')
        .click()
      cy.get('#player .player__seek')
        .click()
      cy.get('#player .player__current')
        .contains('00:01:02')
      cy.get('.progress__bar')
        .should( $div => {
          expect($div[0].style.width).to.be.greaterThan('10%');
        })
    });

    it('play next sound continously', () => {
      cy.setStorage('song', {});
      cy.setStorage('playlist', [{
        title: 'Jézus és a jelzőrakéta',
        url: '/jezusesajelzoraketa.mp3'
      }, {
        title: 'Jézus és a jelzőrakéta111111',
        url: '/jezusesajelzoraketa.mp3'
      }])
      cy.get('#player .player__play')
        .click()
      cy.get('#player .player__seek')
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
      cy.get('.player__title').contains('Jézus és a jelzőrakéta111111')
    });
  });
});

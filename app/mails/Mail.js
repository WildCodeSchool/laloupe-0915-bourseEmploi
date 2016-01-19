var fs = require('fs');

module.exports.newOfferMail = function (receivers, title) {
    return {
        'from': 'WildFinder-noreply <wildfinder.wcs@gmail.com>',
        'to': receivers,
        'subject': "Votre annonce " + title + " est en cours de validation",
        'text': "Merci d'avoir creer une annonce sur WildFinder. Cette dernière est en cours de modération. Vous recevrez un mail lorsqu'elle sera publiée. L'équipe WildFinder.",
        'html': "<h2>WildFinder</h3> <p>Merci d'avoir créer une annonce sur WildFinder. Cette dernière est en cours de modération. Vous recevrez un mail lorsqu'elle sera publiée.</p> <p>L'équipe WildFinder.</p>"
    }
}

module.exports.validateOfferMail = function (receivers, title, startDate, endDate) {
    return {
        'from': 'WildFinder-noreply <wildfinder.wcs@gmail.com>',
        'to': receivers,
        'subject': "Votre annonce " + title + " vient d'être validé",
        'text': "Votre annonce vient d'être validé par nos services. Elle sera publié le " + startDate + " jusqu'au " + endDate + ". L'équipe WildFinder",
        'html': "<h2>WildFinder</h3> <p>Votre annonce vient d'être validé par nos services. Elle sera publié du " + startDate + " jusqu'au " + endDate + ".</p> <p>L'équipe WildFinder.</p>"
    }
}

module.exports.id = function (receivers, email, password, name, firstname) {
    return {
        'from': 'WildFinder-noreply <wildfinder.wcs@gmail.com>',
        'to': receivers,
        'subject': "Vos identifiants WildFinder",
        'text': "Bonjour " + firstname + " " + name + ". Voici vos identifiantrs pour vous connecter à l'application WildFinder: id: " + email + " mot de passe: " + password + ". L'équipe WildFinder.",
        'html': "<h2>WildFinder</h3> <p>Bonjour " + firstname + " " + name + ". Voici vos identifiants pour vous connecter à l'application WildFinder: </p><p> <strong>id:</strong> " + email + " <br/><strong>mot de passe:</strong> " + password + "</p><p>L'équipe WildFinder.</p>"
    }
}
var _ = require('lodash'),
SparkPost = require('sparkpost');

function SparkpostTemplateSender(apikey) {
    if (!apikey)
        throw new Error('Sparkpost API key required');

    this.sparkpost_client = new SparkPost(apikey);
}

SparkpostTemplateSender.prototype.sendTemplate = function(template_id, emailAddresses, variables, callback) {

    if (typeof variables == 'function')
        callback = variables;

    var _emailAddresses = [];

    if (typeof emailAddresses == 'string') {
        _emailAddresses.push({address: emailAddresses})
    }

    if (typeof emailAddresses == Array) {

        emailAddresses.forEach(function(emailAddress){
            _emailAddresses.push({address: emailAddress})
        });
    }

    console.log('recipients = ', _emailAddresses)
    console.log('variables = ', variables)
    
    this.sparkpost_client.transmissions.send({
        transmissionBody: {
            content: {
                template_id: template_id,
            },
            substitution_data: variables,
            recipients: _emailAddresses
        }
    }, function (err, res) { 

        if(err){
            return callback (err)
        }
        return callback();
    });


}

module.exports = SparkpostTemplateSender

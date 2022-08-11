export const shortenUrlRequestSchema = {
    type: 'object',
    required: ['targetUrl'],
    properties: {
        targetUrl: {
            type: 'string',
            nullable: false
        },
        utm: {
            type: 'object',
            nullable: true,
            properties: {
                source: {
                    type: 'string',
                    nullable: true
                },
                medium: {
                    type: 'string',
                    nullable: false
                },
                campaign: {
                    type: 'string',
                    nullable: false
                }
            }
        }
    }
}

export const shortenUrlResponseSchema = {
    201: {
        type: 'object',
        nullable: false,
        properties: {
            url: {
                type: 'object',
                nullable: false,
                properties: {
                    uid: {
                        type: 'string',
                        nullable: false
                    },
                    long: {
                        type: 'string',
                        nullable: false
                    },
                    short: {
                        type: 'string',
                        nullable: false
                    },
                    longWithUtm: {
                        type: 'string',
                        nullable: true
                    }
                }
            }
        }
    }
}
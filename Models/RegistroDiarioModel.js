const DiarioModel = require('./diarioModel');
const UserModel = require('./userModel');

module.exports = (sequelize, DataTypes) => {
    const RegistroDiario = sequelize.define(
        "registro",
        {

            TítuloRegistro: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            DataRegistro: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ConteudoRegistro: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            TipoDeMidia: {
                type: DataTypes.ENUM('Texto', 'Imagem', 'Vídeo', 'Outro'),
                allowNull: true,
            },
            ArquivoDeMidia: {
                type: DataTypes.BLOB,
                allowNull: true,
            },
            Privacidade: {
                type: DataTypes.ENUM('Público', 'Privado', 'Compartilhado'),
                allowNull: false,
            },
            AutorID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: UserModel, 
                    key: 'ID',
                },
            },
            DiarioAssociadoID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: DiarioModel,
                    key: 'ID',
                },
            },
        },
        { timestamps: true }
    );

    RegistroDiario.belongsTo(UserModel, { foreignKey: 'AutorID' });
    RegistroDiario.belongsTo(DiarioModel, { foreignKey: 'DiarioAssociadoID' });

    return RegistroDiario;
};

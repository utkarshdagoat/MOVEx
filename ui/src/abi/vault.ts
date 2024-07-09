import { ABIRoot } from "node_modules/@thalalabs/surf/build/types/types";

export const VAULT_ABI  = {
    "address": "0xa6e77c0890e7301eb2a8c6a6e0b6fcc3d4bfa029193b1e0812ac05faaee3d683",
    "name": "Vault",
    "friends": [],
    "exposed_functions": [
        {
            "name": "add_funds_to_vault",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "&signer",
                "u64"
            ],
            "return": []
        },
        {
            "name": "deposit",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "&signer",
                "u64",
                "u64"
            ],
            "return": []
        },
        {
            "name": "get_dynamic_interest_rate",
            "visibility": "public",
            "is_entry": false,
            "is_view": true,
            "generic_type_params": [],
            "params": [
                "address",
                "u64"
            ],
            "return": [
                "u64"
            ]
        },
        {
            "name": "get_fixed_interest_rate",
            "visibility": "public",
            "is_entry": false,
            "is_view": false,
            "generic_type_params": [],
            "params": [],
            "return": [
                "u64"
            ]
        },
        {
            "name": "get_repayed",
            "visibility": "public",
            "is_entry": false,
            "is_view": true,
            "generic_type_params": [],
            "params": [
                "address"
            ],
            "return": [
                "u64"
            ]
        },
        {
            "name": "liquidate",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "&signer",
                "u64",
                "u64",
                "address"
            ],
            "return": []
        },
        {
            "name": "remove_funds_from_vault",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "&signer",
                "u64"
            ],
            "return": []
        },
        {
            "name": "withdraw",
            "visibility": "public",
            "is_entry": true,
            "is_view": false,
            "generic_type_params": [],
            "params": [
                "&signer",
                "u64",
                "u64"
            ],
            "return": []
        }
    ],
    "structs": [
        {
            "name": "MUSD",
            "is_native": false,
            "abilities": [
                "key"
            ],
            "generic_type_params": [],
            "fields": [
                {
                    "name": "dummy_field",
                    "type": "bool"
                }
            ]
        },
        {
            "name": "VaultInfo",
            "is_native": false,
            "abilities": [
                "key"
            ],
            "generic_type_params": [],
            "fields": [
                {
                    "name": "mint_cap",
                    "type": "0x1::coin::MintCapability<0xa6e77c0890e7301eb2a8c6a6e0b6fcc3d4bfa029193b1e0812ac05faaee3d683::Vault::MUSD>"
                },
                {
                    "name": "burn_cap",
                    "type": "0x1::coin::BurnCapability<0xa6e77c0890e7301eb2a8c6a6e0b6fcc3d4bfa029193b1e0812ac05faaee3d683::Vault::MUSD>"
                },
                {
                    "name": "total_staked",
                    "type": "u64"
                },
                {
                    "name": "repayed",
                    "type": "0x1::simple_map::SimpleMap<address, u64>"
                },
                {
                    "name": "resource_cap",
                    "type": "0x1::account::SignerCapability"
                }
            ]
        }
    ]
} as const;

const Element = (elementItem) => ({
            name: elementItem.name,
            symbol: elementItem.symbol,
            shells: elementItem.shells,
            shellsAmount: elementItem.shells.lenght,
            neutrons: parseInt(elementItem.atomic_mass - elementItem.number),
            number: elementItem.number,
            atomicMass: elementItem.atomic_mass,
            appearance: elementItem.appearance,
            boil: elementItem.boil ,
            category: elementItem.category,
            color: elementItem.color,
            density: elementItem.density,
            discoveredBy: elementItem.discovered_by,
            electronAffinity: elementItem.electron_affinity,
            electronConfiguration: elementItem.electron_configuration,
            electronConfigurationSemantic: elementItem.electron_configuration_semantic,
            electronegativityPauling: elementItem.electronegativity_pauling,
            ionizationEnergies: elementItem.ionization_energies,
            melt: elementItem.melt,
            molarHeat: elementItem.molar_heat,
            namedBy: elementItem.named_by,
            period: elementItem.period,
            phase: elementItem.phase,
            source: elementItem.source,
            spectralImg: elementItem.spectral_img,
            summary: elementItem.summary,
            xpos: elementItem.xpos,
            ypos: elementItem.ypos,
})

export default Element;
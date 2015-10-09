function PatternAssociation

    cs=[1, 0, 1, 0, 1, 0];
    ucs=[1, 1, 0, 0];
    
    learningRate=1;
    
    weights=zeros(4, 6);
    
    for postsynapticCell=1:4
        for presynapticCell=1:6
            weights(postsynapticCell, presynapticCell) = ...
            weights(postsynapticCell, presynapticCell) + ...
            (learningRate*ucs(postsynapticCell)*cs(presynapticCell));
        end
    end
    
    activations=zeros(1, 4);
    firingRates=zeros(1, 4);
    
    for postsynapticCell=1:4
        activationSum=0;
        for presynapticCell=1:6
            activationSum = ...
            activationSum + ...
            (weights(postsynapticCell, presynapticCell)*cs(presynapticCell));
        end
        activations(postsynapticCell)=activationSum;
        if activations(postsynapticCell)>=2
            firingRates(postsynapticCell)=1;
        end
    end
    
    disp(firingRates)
    
end